import React, { useState } from 'react';
import { Upload, message, UploadFile, UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

interface FileUploadProps {
  onChange: (file: UploadFile | null) => void; // Define callback type for file
  limit?: number; // Make limit optional
  accept?: string;
  value?: UploadFile | null; // Define optional value type
}

const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  limit = 5,
  accept,
  value,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>(value ? [value] : []);

  const handleOnChange = (info) => {
    const isLimit = info.file.size / 1024 / 1024 < limit;
    if (!isLimit) {
      message.error(`Limited to ${limit}MB or less`);
      return false;
    }
    onChange(info.file);
  };

  const handleOnRemove = () => {
    setFileList([]);
    onChange(null);
  };

  const handleBeforeUpload = (file) => {
    const isLimit = file.size / 1024 / 1024 < limit;
    if (!isLimit) {
      return false;
    }
    setFileList([file]);
    return false;
  };

  const props: UploadProps = {
    accept,
    name: 'file',
    multiple: false,
    onChange: handleOnChange,
    onRemove: handleOnRemove,
    beforeUpload: handleBeforeUpload,
    fileList,
  };

  return (
    <Upload.Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">{`Support for a single upload. Limited to ${limit}MB or less`}</p>
    </Upload.Dragger>
  );
};

export default FileUpload;
