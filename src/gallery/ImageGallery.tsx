import React, { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { Spin, Row, Col, Card } from 'antd';

interface ScrollHandler {
    (this: HTMLDivElement, ev: Event): void;
}

interface CardData {
    title?: string;
    description?: string; // Optional property
    url: string;
}

const CardComponent: React.FC<CardData> = ({ title, description, url }) => {
    return (
        <Card
            cover={url && <img alt={title} src={url} />}
            style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
        >
            <Card.Meta title={title} description={
                <div style={{ lineHeight: '1.5', textOverflow: 'ellipsis' }}>{description}</div>
            } />
        </Card>
    );
};

const ImageGallery = () => {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const page = useRef(1);
    const screenHeight = window.innerHeight;
    const [pageLimit, setPageLimit] = useState(1);
    const [noDataMessage, setNoDataMessage] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [cols, setCols] = useState(3); // Default number of columns
    const debouncedScroll = useRef<ScrollHandler | null>(null);

    // Handle scroll events
    const handleScroll = () => {
        const container = containerRef.current;

        if (
            container &&
            container.scrollTop + container.clientHeight >=
            container.scrollHeight - 200
        ) {
            loadImages(false);
        }
    };

    useEffect(() => {
        // Load initial images when the component mounts
        loadImages(true);

        addScrollListener();
        return () => removeScrollListener();
    }, []);

    const addScrollListener = () => {
        debouncedScroll.current = debounce(handleScroll, 100);
        if (containerRef.current) {
            containerRef.current.addEventListener("scroll", debouncedScroll.current);
        }
    };

    const removeScrollListener = () => {
        if (containerRef.current && debouncedScroll.current) {
            containerRef.current.removeEventListener("scroll", debouncedScroll.current);
        }
    };

    const loadImages = async (mount) => {
        // Simulate an API call to fetch images
        const response = await fetch(
            `https://api.slingacademy.com/v1/sample-data/photos?offset=${page.current}&limit=10`
        );

        if (mount) {
            setLoading(true);

            const newImages = await response.json();
            const totalPages = Math.ceil(newImages?.total_photos / 10);
            setPageLimit(totalPages);

            setImages((prevImages) => [...prevImages, ...newImages.photos]);

            page.current += 1;
            setLoading(false);
        } else {
            setLoading(true);

            const newImages = await response.json();
            const totalPages = Math.ceil(newImages?.total_photos / 10);
            setPageLimit(totalPages);

            if (page.current <= totalPages) {
                setImages((prevImages) => [...prevImages, ...newImages.photos]);

                page.current += 1;
                setLoading(false);
            } else {
                setLoading(false);
                setNoDataMessage(true);
            }
        }
    };

    return (
        <Spin spinning={loading}>
            <div ref={containerRef} style={{ height: screenHeight + "px", overflowY: "auto" }}>
                <Row gutter={[16, 16]}>
                    {images.map((card, index) => (
                        <Col key={index} span={cols}> {/* Dynamically adjust span */}
                            <CardComponent {...card} />
                        </Col>
                    ))}
                </Row>
                {noDataMessage && <p>No More Data </p>}
            </div>
        </Spin>
    );
}

export default ImageGallery;