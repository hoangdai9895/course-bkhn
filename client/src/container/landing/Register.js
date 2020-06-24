import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import "../../assets/styles/register.scss";
export const Register = ({ visible, setInvisible }) => {
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setInvisible(false);
  };

  const onSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setInvisible(false);
    }, 1000);
  };
  return (
    <Modal
      visible={visible}
      title="Sign Up"
      onCancel={handleCancel}
      footer={null}
    >
      <div className="register__modal">
        <Input size="large" placeholder="Email Address" />
        <Input size="large" placeholder="Username" />
        <Input.Password size="large" placeholder="Password" />
        <Input.Password size="large" placeholder="Re-type Password" />
        <Button
          type="primary"
          size="large"
          className="register_button"
          onClick={onSubmit}
          loading={loading}
        >
          Submit
        </Button>
      </div>
    </Modal>
  );
};
