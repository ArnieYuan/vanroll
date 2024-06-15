import { InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import React, { useState } from 'react'; // Import useState hook

const FileUpload = ({ onChange, limit = 5, accept, value }) => {
  const [fileList, setFileList] = useState(value ? [value] : []);

  const handleOnChange = (info) => {
    const isLimit = info.file.size / 1024 / 1024 < limit;
    if (!isLimit) {
      message.error(`Limited to ${limit}MB or less`);
      return false;
    }
    onChange(info.file);
  };

  const handleOnRemove = (file) => {
    setFileList((prevList) => {
      const index = prevList.indexOf(file);
      const newFileList = prevList.slice();
      newFileList.splice(index, 1);
      return newFileList;
    });
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

  const props = {
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
