import React from 'react';
import Modal from '../ui/Modal';

function ModalConfirmationToClose({ setToggle, onHandlerClose }) {
    return (
        <Modal setToggle={setToggle}>
            <div
                className="ModalTaskTitle flex flex-col 
                w-98 h-auto 
                gap-2 p-4 
                justify-center items-center 
                rounded-3xl 
                border 
                bg-(--background-header) 
                m-2
                "
                onClick={(e) => e.stopPropagation()}
            >
                <h1
                    className="
                    flex w-full
                    text-start
                    text-xl
                    font-bold
                    
                "
                >
                    Hapus tugas ini?
                </h1>
                <p className="flex w-full text-start">Yakin ingin menghapus draft tugas?</p>
                <div
                    className="
                        flex w-full
                        justify-end-safe
                        gap-6
                        mt-4
                    "
                >
                    <button
                        type="button"
                        className="
                            text-(--button-text)!
                            hover:backdrop-brightness-125
                            p-2
                            rounded-2xl
                            cursor-pointer
                            "
                        onClick={setToggle}
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        className="
                            text-(--button-text)!
                            hover:backdrop-brightness-125
                            p-2
                            rounded-2xl
                            cursor-pointer
                        "
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
