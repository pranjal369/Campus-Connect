import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
// import "./ProfileModal.css";
import PostShare from "../PostShare.jsx/PostShare";

function ShareModal({modalOpened,setModalOpened})
{
    const theme=useMantineTheme();
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
     <PostShare/>
    </Modal>
  );
}

export default ShareModal;