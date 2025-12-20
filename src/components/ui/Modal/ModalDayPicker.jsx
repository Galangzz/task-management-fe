import React, { lazy, useEffect, useState } from 'react';
import Calendar from '../DateTime/Calendar';
import Modal from './Modal';
import { IoMdTime } from 'react-icons/io';
const ModalTimePicker = lazy(() => import('./ModalTimePicker'));
import { RxCross2 } from 'react-icons/rx';

function ModalDayPicker({
    toggleCalendar,
    onHandleSubmit,
    selected,
    setSelected,
    selectedTime,
    setSelectedTime,
    isOpenTime,
    setIsOpenTime,
    isSubmitTime,
    setIsSubmitTime,
    onHandleSubmitTime,
}) {
    const [hours, setHours] = useState(null);
    const [minutes, setMinutes] = useState(null);

    useEffect(() => {
        if (!isSubmitTime) return;
        setHours(selected.getHours());
        setMinutes(selected.getMinutes());
    }, [isSubmitTime, selected]);

    return (
        <>
            <Modal setToggle={toggleCalendar}>
                <div
                    className="animate-fade-in m-2! flex h-auto w-96 flex-col items-center gap-2 rounded-2xl bg-(--background-header) py-4!"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex h-92 w-full justify-center">
                        <Calendar
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </div>
                    <div
                        className="flex w-full cursor-pointer items-center gap-4 border-y px-10! py-4! hover:backdrop-brightness-125"
                        onClick={() => setIsOpenTime(true)}
                    >
                        <IoMdTime className="text-2xl" />
                        {isSubmitTime ? (
                            <div
                                className="flex w-fit items-center gap-2 border p-2! text-xl leading-none"
                                // onClick={(e) => e.stopPropagation()}
                            >
                                <p className="m-0 translate-y-0.5">{`${String(hours).padStart(2, '0')}:${String(
                                    minutes
                                ).padStart(2, '0')}`}</p>
                                <div
                                    className="flex h-full cursor-pointer items-center justify-center text-[22px] transition! duration-300 ease-in-out hover:scale-125"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsSubmitTime(false);
                                    }}
                                >
                                    <RxCross2 />
                                </div>
                            </div>
                        ) : (
                            <p className="text-xl">Setel waktu</p>
                        )}
                    </div>
                    <div className="flex w-full items-center justify-end-safe gap-8 px-12! py-2! font-medium">
                        <button
                            type="button"
                            className="cursor-pointer rounded-2xl p-2! text-(--button-text)! hover:backdrop-brightness-125"
                            onClick={toggleCalendar}
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            className="cursor-pointer rounded-2xl p-2! text-(--button-text)! hover:backdrop-brightness-125"
                            onClick={onHandleSubmit}
                        >
                            Selesai
                        </button>
                    </div>
                </div>
            </Modal>
            {isOpenTime && (
                <ModalTimePicker
                    toggleTime={(e) => {
                        e.stopPropagation();
                        setIsOpenTime(false);
                    }}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    onSubmitTime={onHandleSubmitTime}
                />
            )}
        </>
    );
}

export default ModalDayPicker;
