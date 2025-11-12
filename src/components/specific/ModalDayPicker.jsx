import React from 'react';
import Calendar from './Calendar';
import Modal from '../ui/Modal';
import { IoMdTime } from 'react-icons/io';
import ModalTimePicker from './ModalTimePicker';

function ModalDayPicker({ toggleCalendar, onHandleSubmit, selected, setSelected, selectedTime, setSelectedTime, isOpenTime, setIsOpenTime }) {

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
                        {isOpenTime ? '' : <p className="text-xl">Setel waktu</p>}
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
                />
            )}
        </>
    );
}

export default ModalDayPicker;
