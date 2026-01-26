import React, { lazy } from 'react';
import Modal from './Modal.js';
import { Clock, TextAlignStart, X } from 'lucide-react';
import StarCheck from '../StarCheck.js';
const ModalDayPicker = lazy(() => import('./ModalDayPicker.js'));
import { formatCustomDate } from '../../../utils/index.js';
import useNewTask from '../../../hooks/useNewTask.js';
const ModalConfirmationToClose = lazy(
    () => import('./ModalConfirmationToClose.js')
);

type ModalNewTaskProps = {
    tabId: string;
    setIsOpenModalTask: (p: boolean) => void;
};

function ModalNewTask({ setIsOpenModalTask, tabId }: ModalNewTaskProps) {
    const { form, dateTime, submit, confirm } = useNewTask(tabId);

    return (
        <>
            <Modal setToggle={() => confirm.requestClose(setIsOpenModalTask)}>
                <div
                    className="ModalTaskTitle animate-fade-in m-2! flex h-auto w-98 flex-col items-center justify-center gap-6 rounded-3xl bg-(--background-header) p-4!"
                    onClick={(e) => e.stopPropagation()}
                >
                    <form
                        id="newTaskForm"
                        action="submit"
                        className="flex w-full flex-col gap-2"
                        onSubmit={(e) => submit(e, setIsOpenModalTask)}
                    >
                        <input
                            value={form.title}
                            onChange={form.setTitle}
                            id="newTaskTitle"
                            type="text"
                            placeholder="Tugas Baru"
                            className="rounded-xl p-2! text-xl backdrop-invert-25 focus:outline-none"
                            maxLength={50}
                            required
                        />
                        {form.isOpenDetail && (
                            <textarea
                                ref={form.textRef}
                                value={form.detail}
                                onInput={form.handleInputDetail}
                                id="newTaskDetail"
                                placeholder="Tambahkan detail"
                                className="scrollbar-custom-textarea animate-fade-in h-auto max-h-52 w-full resize-none overflow-y-auto px-2! focus:outline-none"
                                rows={1}
                            />
                        )}
                        {dateTime.hasDate && (
                            <div className="mt-2! flex w-fit items-center gap-2 border-2 p-2! text-[14px] font-bold">
                                <p>
                                    {dateTime.deadline.value &&
                                        formatCustomDate(
                                            new Date(
                                                dateTime.deadline.value
                                            ).toLocaleDateString()
                                        )}
                                </p>
                                {dateTime.hasTime && (
                                    <p className="m-0">{`${String(dateTime.deadline.value?.getHours()).padStart(2, '0')}:${String(
                                        dateTime.deadline.value?.getMinutes()
                                    ).padStart(2, '0')}`}</p>
                                )}
                                <div
                                    className="flex cursor-pointer items-center justify-center transition! duration-300 ease-in-out hover:scale-125"
                                    onClick={dateTime.date.unSubmit}
                                >
                                    <X size={18} />
                                </div>
                            </div>
                        )}
                        <div className="flex items-center justify-between text-center">
                            <div className="mt-2 flex flex-1 items-center gap-2 text-2xl">
                                <div
                                    className="w-fit cursor-pointer rounded-4xl p-2! hover:backdrop-brightness-110"
                                    onClick={form.openDetail}
                                >
                                    <TextAlignStart />
                                </div>
                                <div className="w-fit cursor-pointer rounded-4xl p-2! hover:backdrop-brightness-110">
                                    <Clock
                                        onClick={dateTime.toggleCalendar.open}
                                    />
                                </div>
                                <div className="w-fit cursor-pointer rounded-4xl p-2! hover:backdrop-brightness-110">
                                    <StarCheck
                                        id="newTask"
                                        checked={form.starred}
                                        onChange={form.setStarred}
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
            {dateTime.toggleCalendar.isOpen && (
                <ModalDayPicker
                    toggleCalendar={dateTime.toggleCalendar.close}
                    selected={dateTime.deadline.value}
                    setSelected={dateTime.deadline.setValue}
                    selectedTime={dateTime.deadline.value}
                    setSelectedTime={dateTime.deadline.setValue}
                    isOpenTime={dateTime.toggleTime.isOpen}
                    isSubmitTime={dateTime.hasTime}
                    openTime={dateTime.toggleTime.open}
                    closeTime={dateTime.toggleTime.close}
                    onHandleSubmit={dateTime.date.submit}
                    onHandleSubmitTime={dateTime.time.submit}
                    unSubmitTime={dateTime.time.unSubmit}
                />
            )}
            {confirm.isOpenConfirm && (
                <ModalConfirmationToClose
                    setToggle={confirm.closeConfirm}
                    onHandlerClose={() =>
                        confirm.confirmClose(setIsOpenModalTask)
                    }
                />
            )}
        </>
    );
}

export default ModalNewTask;
