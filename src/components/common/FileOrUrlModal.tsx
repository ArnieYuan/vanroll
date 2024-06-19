import React, { useState } from 'react';
import { Upload, UploadFile, message, Modal, Input, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

interface FileOrUrlModalProps {
    // Callback function for uploaded file or entered URL
    onSubmit: (src: string, file?: UploadFile) => void;
    onCancel: () => void;
    // Optional initial value for URL input
    initialValue?: string;
    // Optional limit for file size (MB)
    fileSizeLimit?: number;
    // Optional accepted file types
    // Url only mode if not set
    fileAccept?: string;
    visible: boolean;
}

const FileOrUrlModal: React.FC<FileOrUrlModalProps> = ({
    onSubmit,
    onCancel,
    initialValue = '',
    fileSizeLimit = 5,
    fileAccept,
    visible = false
}) => {
    const [url, setUrl] = useState(initialValue);

    const handleUploadChange = (info) => {
        const isLimit = info.file.size / 1024 / 1024 < fileSizeLimit;
        if (!isLimit) {
            message.error(`Limited to ${fileSizeLimit}MB or less`);
            return false;
        }
        onSubmit("", info.file);
    };

    const handleBeforeUpload = () => {
        return false;
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUrl(e.target.value);
    };

    const handleCancel = () => {
        setUrl("");
        onCancel();
    };

    const handleSubmit = () => {
        onSubmit(url);
        setUrl("");
    };

    return (
        <Modal open={visible} onCancel={handleCancel} footer={null}>
            {fileAccept &&
                <>
                    <Upload.Dragger {...{ onChange: handleUploadChange, beforeUpload: handleBeforeUpload, accept: fileAccept, multiple: false, fileList: [] }}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">{`Support for a single upload. Limited to ${fileSizeLimit}MB or less`}</p>
                    </Upload.Dragger>
                    <p> Or enter a URL </p>
                </>}
            <Input.TextArea value={url} onChange={handleUrlChange} autoSize />
            <Button type="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </Modal>
    );
};

export default FileOrUrlModal;
