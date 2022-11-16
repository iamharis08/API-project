import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import BecomeHostButton from '../Navigation/NavBar/BecomeHostButton';
import CreateSpotForm from './CreateSpotForm';

function CreateSpotFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <BecomeHostButton onClick={() => setShowModal(true)} />
      {/* {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {login ? (
                  <CreateSpotForm  setShowModal={setShowModal} />
                ) : (
                  <LoginForm setShowModal={setShowModal} />
                )}

        </Modal>
      )} */}
    </>
  );
}

export default CreateSpotFormModal;
