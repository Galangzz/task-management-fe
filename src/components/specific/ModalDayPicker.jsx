import React, { useEffect, useState } from 'react';
import Calendar from './Calendar';
import Modal from '../ui/Modal';
import { IoMdTime } from 'react-icons/io';
import ModalTimePicker from './ModalTimePicker';
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
                    className="
            flex flex-col
            items-center
            gap-2
            bg-(--background-header)
            w-96
            h-auto
            rounded-2xl
            py-4
            m-2
            "
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex w-full h-92 justify-center ">
                        <Calendar
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </div>
                    <div
                        className="
                        flex
                        items-center
                        w-full
                        gap-4
                        border-y
                        py-4
                        px-10
                        cursor-pointer
                        hover:backdrop-brightness-125
                    "
                        onClick={() => setIsOpenTime(true)}
                    >
                        <IoMdTime className="text-2xl" />
                        {isSubmitTime ? (
                            <div
                                className="
                            flex items-center 
                            w-fit
                            border
                            p-2
                            gap-2 
                            text-xl
                            leading-none"
                                // onClick={(e) => e.stopPropagation()}
                            >
                                <p className="m-0 translate-y-0.5">{`${String(hours).padStart(2, '0')}:${String(
                                    minutes
                                ).padStart(2, '0')}`}</p>
                                <div
                                    className="
                                    flex justify-center items-center 
                                    h-full
                                    transition!
                                    duration-300
                                    ease-in-out
                                    hover:scale-125 
                                    cursor-pointer
                                    text-[22px]"
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
                    <div
                        className="
                        flex
                        gap-8
                        items-center
                        justify-end-safe
                        w-full
                        py-2
                        px-12
                        font-medium
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
                            onClick={toggleCalendar}
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
