import React from 'react';
import Modal from './Modal';
import { CgSpinnerTwo } from 'react-icons/cg';

function LoadingPage() {
    return (
        <Modal setToggle={(e) => e.stopPropagation()}>
            <div className="flex animate-spin text-6xl">
                <CgSpinnerTwo />
            </div>
        </Modal>
    );
}

export default LoadingPage;
