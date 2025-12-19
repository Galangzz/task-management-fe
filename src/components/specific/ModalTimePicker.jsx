import React, { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import CustomTimeField from '../ui/CustomTimeField';
import CustomClockField from '../ui/CustomClockField';
import { IoMdTime } from 'react-icons/io';
import { FaKeyboard } from 'react-icons/fa';

function ModalTimePicker({
    toggleTime,
    selectedTime,
    setSelectedTime,
    onSubmitTime,
}) {
    const [inputTimeField, setInputTimeField] = useState(false);
    const [viewClock, setViewClock] = useState('hours');
    const [clickCount, setClickCount] = useState(0);
    const [errTimeField, setErrTimeField] = useState(null);

    useEffect(() => {
        if (clickCount === 3) {
            setInputTimeField(true);
            setClickCount(0);
        }

        const timer = setTimeout(() => setClickCount(0), 500);

        return () => clearTimeout(timer);
    }, [clickCount]);

    return (
        <Modal setToggle={toggleTime}>
            <div
                className="m-2! flex h-auto w-96 flex-col items-center gap-2 rounded-2xl bg-(--background-header) py-4 animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="flex w-full px-4!">Pilih Waktu</p>
                <div className="flex w-full items-center justify-center gap-2 p-2! text-4xl font-bold">
                    <CustomTimeField
                        id={'hours'}
                        time={selectedTime}
                        format={'HH'}
                        view={viewClock}
                        onClick={() => {
                            setViewClock('hours');
                            setClickCount((prev) => prev + 1);
                        }}
                        onChange={setSelectedTime}
                        readOnly={!inputTimeField}
                        onError={(error) => {
                            setErrTimeField(error);

                            // setSelectedTime(date);
                        }}
                    />
                    :
                    <CustomTimeField
                        id={'minutes'}
                        time={selectedTime}
                        format={'mm'}
                        view={viewClock}
                        onClick={() => {
                            setViewClock('minutes');
                            setClickCount((prev) => prev + 1);
                        }}
                        onChange={setSelectedTime}
                        readOnly={!inputTimeField}
                        onError={(error) => {
                            setErrTimeField(error);

                            // if (!error) {
                            //     setSelectedTime(date);
                            // }
                            // console.log({ date });
                        }}
                    />
                </div>
                {!inputTimeField && (
                    <div className="flex w-full">
                        <CustomClockField
                            onChange={setSelectedTime}
                            time={selectedTime}
                            view={viewClock}
                            setView={setViewClock}
                        />
                    </div>
                )}
                <div className="flex w-full items-center p-2!">
                    <div className="flex-1 pl-6! text-2xl">
                        {inputTimeField ? (
                            <IoMdTime
                                className="cursor-pointer transition! duration-200 ease-in-out hover:scale-110 hover:rotate-12"
                                onClick={() => setInputTimeField(false)}
                            />
                        ) : (
                            <FaKeyboard
                                className="cursor-pointer transition! duration-200 ease-in-out hover:scale-110 hover:rotate-12"
                                onClick={() => setInputTimeField(true)}
                            />
                        )}
                    </div>
                    <div className="flex gap-6 px-6">
                        <button
                            type="button"
                            className="cursor-pointer rounded-2xl p-2! text-(--button-text)! hover:backdrop-brightness-125"
                            onClick={toggleTime}
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            className="cursor-pointer rounded-2xl p-2! text-(--button-text)! hover:backdrop-brightness-125 disabled:cursor-not-allowed disabled:text-gray-600!"
                            onClick={onSubmitTime}
                            disabled={errTimeField}
                        >
                            Selesai
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ModalTimePicker;
