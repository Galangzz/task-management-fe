import React, { lazy, useEffect, useState } from 'react';
import Calendar from '../DateTime/Calendar.js';
import Modal from './Modal.js';
import { Clock, X } from 'lucide-react';
const ModalTimePicker = lazy(() => import('./ModalTimePicker.js'));

type ModalDayPickerProps = {
    toggleCalendar: () => void;
    onHandleSubmit: () => void;
    selected: Date | null;
    setSelected: React.Dispatch<React.SetStateAction<Date | null>>;
    selectedTime: Date | null;
    setSelectedTime: React.Dispatch<React.SetStateAction<Date | null>>;
    isOpenTime: boolean;
    openTime: () => void;
    closeTime: () => void;
    isSubmitTime: boolean;
    unSubmitTime: () => void;
    onHandleSubmitTime: () => void;
};

function ModalDayPicker({
    toggleCalendar,
    onHandleSubmit,
    selected,
    setSelected,
    selectedTime,
    setSelectedTime,
    isOpenTime,
    openTime,
    closeTime,
    isSubmitTime,
    unSubmitTime,
    onHandleSubmitTime,
}: ModalDayPickerProps) {
    const [hours, setHours] = useState<Number>();
    const [minutes, setMinutes] = useState<Number>();

    useEffect(() => {
        if (!isSubmitTime) return;
        if (selected) {
            setHours(new Date(selected).getHours());
            setMinutes(new Date(selected).getMinutes());
        }
    }, [isSubmitTime, selected]);

    useEffect(() => {
        if (!selected) {
            const date = new Date();
            date.setHours(0, 0, 0, 0);
            setSelected(date);
        }
    }, [selected]);

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
                        onClick={openTime}
                    >
                        <Clock className="text-2xl" />
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
                                        unSubmitTime();
                                    }}
                                >
                                    <X />
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
                    toggleTime={closeTime}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    onSubmitTime={onHandleSubmitTime}
                />
            )}
        </>
    );
}

export default ModalDayPicker;
