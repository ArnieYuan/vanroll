import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Input } from 'antd';
import i18n from 'i18next';

const UrlModal = ({ value, onChange }) => {
  const [visible, setVisible] = useState(false);
  let tempUrl = value;

  const handleCancel = () => setVisible(false);
  const handleOk = () => {
    onChange(tempUrl);
    setVisible(false);
  };

  return (
    <React.Fragment>
      <Modal open={visible} onCancel={handleCancel} onOk={handleOk}>
        <Form.Item label={i18n.t('common.url')} colon={false}>
          <Input
            defaultValue={value}
            onChange={(e) => tempUrl = e.target.value}
          />
        </Form.Item>
      </Modal>
    </React.Fragment>
  );
};

UrlModal.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default UrlModal;