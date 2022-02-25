import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal } from 'ui-kit/Modal';
import { useRootStore } from 'src/store';
import { MODAL } from 'src/constants';

import { SignIn } from './SignIn';

export const LoginModal: FC = observer(() => {
  const { uiStore } = useRootStore();

  const handleCloseModal = () => {
    uiStore.closeModal(MODAL.LOGIN);
  }

  const isOpen = uiStore.isModalOpen(MODAL.LOGIN);

  return (
    <Modal isOpen={isOpen}>
      <Modal.Overlay onClick={handleCloseModal} />
      <SignIn onClose={handleCloseModal} modalId={MODAL.LOGIN} />
    </Modal>
  )
});

LoginModal.displayName = 'LoginModal';
