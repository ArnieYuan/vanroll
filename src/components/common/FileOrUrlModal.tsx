import React, { useState } from 'react';
import { Upload, UploadFile, message, Modal, Input, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

interface FileOrUrlModalProps {
    // Callback function for uploaded file or entered URL
    onSubmit: (file?: UploadFile | string) => void;
    // Optional initial value for URL input
    initialValue?: string;
    // Optional limit for file size (MB)
    fileSizeLimit?: number;
    // Optional accepted file types
    // Url only mode if not set
    fileAccept?: string;
}

const FileOrUrlModal: React.FC<FileOrUrlModalProps> = ({
    onSubmit,
    initialValue = '',
    fileSizeLimit = 5,
    fileAccept,
}) => {
    const [isUploadMode, setIsUploadMode] = useState(fileAccept ? true : false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [url, setUrl] = useState(initialValue);

    const handleUploadChange = (info) => {
        const isLimit = info.file.size / 1024 / 1024 < fileSizeLimit;
        if (!isLimit) {
            message.error(`Limited to ${fileSizeLimit}MB or less`);
            return false;
        }
        setFileList([info.file]);
    };

    const handleOnRemove = () => {
        setFileList([]);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUrl(e.target.value);
    };

    const handleCancel = () => {
        setIsUploadMode(true);
        setFileList([]);
        setUrl(initialValue);
    };

    const handleSubmit = () => {
        if (isUploadMode) {
            if (!fileList.length) {
                message.error('Please select a file to upload');
                return;
            }
            onSubmit(fileList[0]);
        } else {
            onSubmit(url);
        }
        setIsUploadMode(true);
        setFileList([]);
        setUrl(initialValue);
    };

    const handleToggleMode = () => {
        setIsUploadMode(!isUploadMode);
        setFileList([]);
        setUrl(initialValue);
    };

    return (
        <Modal open={true} onCancel={handleCancel} footer={null}>
            {isUploadMode ? (
                <>
                    <Upload.Dragger {...{ onChange: handleUploadChange, onRemove: handleOnRemove, accept: fileAccept, fileList }}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">{`Support for a single upload. Limited to ${fileSizeLimit}MB or less`}</p>
                    </Upload.Dragger>
                    <Button type="link" onClick={handleToggleMode}>
                        Or enter a URL
                    </Button>
                </>
            ) : (
                <>
                    <Input.TextArea value={url} onChange={handleUrlChange} autoSize />
                    if (fileAccept) {
                        <Button type="link" onClick={handleToggleMode}>
                            Or upload a file
                        </Button>
                    }
                </>
            )}
            <Button type="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </Modal>
    );
};

export default FileOrUrlModal;
