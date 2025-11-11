import React, { useRef, useState } from 'react';
import Modal from '../ui/Modal';
import { CgDetailsMore } from 'react-icons/cg';
import { IoMdTime } from 'react-icons/io';
import StarCheck from '../ui/StarCheck';

function ModalNewTask() {
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [isOpenDetail, setIsOpenDetail] = useState(false);
    const textRef = useRef(null);

    const handleInputDetail = (e) => {
        const el = textRef.current;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
        setDetail(e.target.value);
    };

    const handleAddDetail = () => {
        setIsOpenDetail(true);
    };

    return (
        <Modal setToggle={() => alert('aaaa')}>
            <div
                className="ModalTaskTitle flex flex-col 
                w-98 h-auto 
                gap-6 p-4 
                justify-center items-center 
                rounded-3xl 
                border 
                bg-(--background-header) 

                "
                onClick={(e) => e.stopPropagation()}
            >
                <form
                    id="newTaskForm"
                    action="submit"
                    className="
                    flex flex-col
                    gap-2
                    w-full
                    
                "
                >
                    <input
                        value={title}
                        id="newTaskTitle"
                        type="text"
                        placeholder="Tugas Baru"
                        className="
                            text-xl
                            border-b-2
                            p-2
                            rounded-xl
                            focus:outline-none
                            focus:border
                        "
                        maxLength={30}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            console.log(title);
                        }}
                    />
                    {isOpenDetail && (
                        <textarea
                            ref={textRef}
                            value={detail}
                            onInput={handleInputDetail}
                            id="newTaskDetail"
                            placeholder="Tambahkan detail"
                            className="
                    scrollbar-custom-textarea
                    w-full
                    h-auto
                    max-h-52 overflow-y-auto
                    px-2
                    focus:outline-none
                    resize-none
                    "
                            rows={1}
                        />
                    )}
                    <div
                        className="
                        flex justify-between items-center text-center
                        "
                    >
                        <div className="flex flex-1 gap-2 items-center text-2xl mt-2">
                            <div
                                className="
                                rounded-4xl
                                hover:backdrop-brightness-110
                                cursor-pointer
                                w-fit
                                p-2
                                "
                                onClick={handleAddDetail}
                            >
                                <CgDetailsMore />
                            </div>
                            <div
                                className="
                                rounded-4xl
                                hover:backdrop-brightness-110
                                cursor-pointer
                                w-fit
                                p-2
                                "
                            >
                                <IoMdTime />
                            </div>
                            <div
                                className="
                                rounded-4xl
                                hover:backdrop-brightness-110
                                cursor-pointer
                                w-fit
                                p-2
                                "
                            >
                                <StarCheck />
                            </div>
                        </div>
                        <button
                            // disabled
                            type="submit"
                            className="
                            text-center
                            rounded-2xl
                            p-2
                            text-blue-500!
                            disabled:text-gray-400!
                            hover:backdrop-brightness-110
                            "
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default ModalNewTask;
