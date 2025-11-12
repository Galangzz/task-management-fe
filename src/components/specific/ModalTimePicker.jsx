import React from 'react';
import Modal from '../ui/Modal';
import CustomTimeField from '../ui/CustomTimeField';
import CustomClockField from '../ui/CustomClockField';

function ModalTimePicker({ toggleTime, selectedTime, setSelectedTime }) {

    
    return (
        <Modal setToggle={toggleTime}>
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
                <p className="flex w-full px-4">Pilih Waktu</p>
                <div
                    className="
                    flex
                    justify-center
                    items-center
                    gap-2
                    text-4xl
                    font-bold
                    w-full
                    p-2
                    "
                >
                    <CustomTimeField
                        time={selectedTime}
                        format={'HH'}
                    />
                    :
                    <CustomTimeField
                        time={selectedTime}
                        format={'mm'}
                    />
                </div>
                <div className="flex w-full bg-red-500">
                    <CustomClockField
                        onChange={setSelectedTime}
                        time={selectedTime}
                    />
                </div>
            </div>
        </Modal>
    );
}

export default ModalTimePicker;
