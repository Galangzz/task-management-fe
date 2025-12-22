import React, { lazy } from 'react';
import Modal from './Modal.js';
import { CgCross, CgDetailsMore } from 'react-icons/cg';
import { IoMdTime } from 'react-icons/io';
import StarCheck from '../StarCheck.js';
const ModalDayPicker = lazy(() => import('./ModalDayPicker.js'));
import { formatCustomDate } from '../../../utils/index.js';
import { RxCross2 } from 'react-icons/rx';
import useNewTask from '../../../hooks/useNewTask.js';
const ModalConfirmationToClose = lazy(
    () => import('./ModalConfirmationToClose.js')
);

type ModalNewTaskProps = {
    setIsOpenModalTask: (p: boolean) => void;
};

function ModalNewTask({ setIsOpenModalTask }: ModalNewTaskProps) {
    const {
        title,
        detail,
        isOpenDetail,
        isOpenCalendar,
        isOpenTime,
        isSubmitDateTime,
        isSubmitTime,
        selected,
        textRef,
        starred,
        isOpenConfirmationToClose,
        // error,
        setStarred,
        setTitle,
        setIsSubmitDateTime,
        setIsSubmitTime,
        handleSubmitTime,
        handleInputDetail,
        handleAddDetail,
        handleOpenCalendar,
        setIsOpenCalendar,
        setIsOpenTime,
        handleSubmitDateTime,
        setSelected,
        handleSubmitNewTask,
        handleCloseModalNewTask,
        setIsOpenConfirmationToClose,
        handleConfirmationToClose,
    } = useNewTask();

    return (
        <>
            <Modal
                setToggle={() => handleCloseModalNewTask(setIsOpenModalTask)}
            >
                <div
                    className="ModalTaskTitle animate-fade-in m-2! flex h-auto w-98 flex-col items-center justify-center gap-6 rounded-3xl bg-(--background-header) p-4!"
                    onClick={(e) => e.stopPropagation()}
                >
                    <form
                        id="newTaskForm"
                        action="submit"
                        className="flex w-full flex-col gap-2"
                        onSubmit={(e) => {
                            handleSubmitNewTask(e, setIsOpenModalTask);
                        }}
                    >
                        <input
                            value={title}
                            onChange={setTitle}
                            id="newTaskTitle"
                            type="text"
                            placeholder="Tugas Baru"
                            className="rounded-xl p-2! text-xl backdrop-invert-25 focus:outline-none"
                            maxLength={50}
                            required
                        />
                        {isOpenDetail && (
                            <textarea
                                ref={textRef}
                                value={detail}
                                onInput={handleInputDetail}
                                id="newTaskDetail"
                                placeholder="Tambahkan detail"
                                className="scrollbar-custom-textarea animate-fade-in h-auto max-h-52 w-full resize-none overflow-y-auto px-2! focus:outline-none"
                                rows={1}
                            />
                        )}
                        {isSubmitDateTime && (
                            <div className="mt-2! flex w-fit items-center gap-2 border-2 p-2! text-[14px] font-bold">
                                <p>
                                    {formatCustomDate(
                                        new Date(selected).toLocaleDateString()
                                    )}
                                </p>
                                {isSubmitTime && (
                                    <p className="m-0">{`${String(selected?.getHours()).padStart(2, '0')}:${String(
                                        selected?.getMinutes()
                                    ).padStart(2, '0')}`}</p>
                                )}
                                <div
                                    className="flex cursor-pointer items-center justify-center transition! duration-300 ease-in-out hover:scale-125"
                                    onClick={() => setIsSubmitDateTime(false)}
                                >
                                    <RxCross2 size={18} />
                                </div>
                            </div>
                        )}
                        <div className="flex items-center justify-between text-center">
                            <div className="mt-2 flex flex-1 items-center gap-2 text-2xl">
                                <div
                                    className="w-fit cursor-pointer rounded-4xl p-2! hover:backdrop-brightness-110"
                                    onClick={handleAddDetail}
                                >
                                    <CgDetailsMore />
                                </div>
                                <div className="w-fit cursor-pointer rounded-4xl p-2! hover:backdrop-brightness-110">
                                    <IoMdTime onClick={handleOpenCalendar} />
                                </div>
                                <div className="w-fit cursor-pointer rounded-4xl p-2! hover:backdrop-brightness-110">
                                    <StarCheck
                                        id="newTask"
                                        checked={starred}
                                        onChange={() => setStarred(!starred)}
                                    />
                                </div>
                            </div>
                            <button
                                // disabled
                                type="submit"
                                className="rounded-2xl p-2! text-center text-(--button-text)! hover:backdrop-brightness-110 disabled:text-gray-400!"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            {isOpenCalendar && (
                <ModalDayPicker
                    toggleCalendar={(e) => {
                        e.stopPropagation();
                        setIsOpenCalendar(false);
                    }}
                    selected={selected}
                    setSelected={setSelected}
                    selectedTime={selected}
                    setSelectedTime={(newTime) => setSelected(newTime)}
                    isOpenTime={isOpenTime}
                    isSubmitTime={isSubmitTime}
                    setIsOpenTime={setIsOpenTime}
                    onHandleSubmit={handleSubmitDateTime}
                    onHandleSubmitTime={handleSubmitTime}
                    setIsSubmitTime={setIsSubmitTime}
                />
            )}
            {isOpenConfirmationToClose && (
                <ModalConfirmationToClose
                    setToggle={() => setIsOpenConfirmationToClose(false)}
                    onHandlerClose={() => {
                        handleConfirmationToClose();
                        setIsOpenModalTask(false);
                    }}
                />
            )}
        </>
    );
}

export default ModalNewTask;
