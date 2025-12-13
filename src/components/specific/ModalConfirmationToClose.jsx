import React from 'react';
import Modal from '../ui/Modal';

function ModalConfirmationToClose({ setToggle, onHandlerClose }) {
    return (
        <Modal setToggle={setToggle}>
            <div
                className="ModalTaskTitle m-2! flex h-auto w-98 flex-col items-center justify-center gap-2 rounded-3xl border bg-(--background-header) p-4!"
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className="flex w-full text-start text-xl font-bold">
                    Hapus tugas ini?
                </h1>
                <p className="flex w-full text-start">
                    Yakin ingin menghapus draft tugas?
                </p>
                <div className="mt-4! flex w-full justify-end-safe gap-6">
                    <button
                        type="button"
                        className="cursor-pointer rounded-2xl p-2! text-(--button-text)! hover:backdrop-brightness-125"
                        onClick={setToggle}
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        className="cursor-pointer rounded-2xl p-2! text-(--button-text)! hover:backdrop-brightness-125"
                        onClick={onHandlerClose}
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalConfirmationToClose;
