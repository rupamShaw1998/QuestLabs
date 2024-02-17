import { Modal, Typography } from "antd";
import React, { useState } from "react";

const { Text, Title } = Typography;

const BadgeModal = ({ badge }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <img
        onClick={() => setIsModalOpen(true)}
        style={{ width: "20%" }}
        src={badge.imageUrl}
        alt="badge"
      />
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        centered
        footer={null}
        className="modal"
      >
        <img style={{ width: "30%", margin: "12% 35% 0", }} src={badge.imageUrl} alt="badge" />
        <Title style={{ textAlign: "center"}} level={3}>Badge Unlocked!🌟</Title>
        <Text style={{ marginLeft: "10%" }} type="secondary">🎉Level Up! Earned a shiny new Badge🥇✨</Text>
      </Modal>
    </>
  );
};

export default BadgeModal;
