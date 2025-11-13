import React from 'react';
import Modal from '../ui/Modal';
import { CgCross, CgDetailsMore } from 'react-icons/cg';
import { IoMdTime } from 'react-icons/io';
import StarCheck from '../ui/StarCheck';
import ModalDayPicker from './ModalDayPicker';
import { formatCustomDate } from '../../utils';
import { RxCross2 } from 'react-icons/rx';
import useTime from '../../hooks/useTime';

function ModalNewTask({setIsOpenModalTask}) {
    const {
        title,
        detail,
        isOpenDetail,
        isOpenCalendar,
        isOpenTime,
        isSubmitDateTime,
        isSubmitTime,
        selected,
        // time,
        textRef,
        stared,
        error,
        setStared,
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
        // handleTimeChange,
    } = useTime();
    // console.log('ModalNewTask: ', { isOpenTime });
    const hours = selected.getHours();
    const minutes = selected.getMinutes();
    return (
        <>
            <Modal setToggle={() => alert('aaaa')}>
                <div
                    className="ModalTaskTitle flex flex-col 
                w-98 h-auto 
                gap-6 p-4 
                justify-center items-center 
                rounded-3xl 
                border 
                bg-(--background-header) 
                m-2
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
                            className="
                            text-xl
                            border-b-2
                            p-2
                            rounded-xl
                            focus:outline-none
                            focus:border
                        "
                            maxLength={30}
                            required
                        />
                        {error !== '' && <p>{error}</p>}
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
                        {isSubmitDateTime && (
                            <div
                                className="
                            flex 
                            gap-2 
                            items-center
                            text-[14px]
                            font-bold
                            border-2
                            w-fit
                            p-2
                            mt-2   
                        "
                            >
                                <p>{formatCustomDate(selected)}</p>
                                {isSubmitTime && (
                                    <p className="m-0">{`${String(hours).padStart(2, '0')}:${String(minutes).padStart(
                                        2,
                                        '0'
                                    )}`}</p>
                                )}
                                <div
                                    className="flex justify-center items-center 
                            transition!
                            duration-300
                            ease-in-out
                            hover:scale-125 
                            cursor-pointer"
                                    onClick={() => setIsSubmitDateTime(false)}
                                >
                                    <RxCross2 size={18} />
                                </div>
                            </div>
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
                                    <IoMdTime onClick={handleOpenCalendar} />
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
                                    <StarCheck
                                        id="newTask"
                                        checked={stared}
                                        onChange={() => setStared(!stared)}
                                    />
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
        </>
    );
}

export default ModalNewTask;
