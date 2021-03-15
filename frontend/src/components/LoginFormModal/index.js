import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <a style={{color:"#897DFF",fontWeight:"bold",marginRight:"10px"}} onClick={(e) => {e.preventDefault();setShowModal(true)}}>Log In</a>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm style={{backgroundColor:"darkgray"}}/>
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;