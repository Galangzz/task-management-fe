import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Field from '../components/ui/Field.js';
import { CgDetailsMore } from 'react-icons/cg';
import { IoMdTime } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa';
import StarCheck from '../components/ui/StarCheck.js';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { formatCustomDate } from '../utils/index.js';
import { RxCross2 } from 'react-icons/rx';
import LoadingPage from '../components/ui/Loading/LoadingPage.js';
import { motion } from 'framer-motion';
import { useDetailTask } from '../hooks/useDetailTask.js';
import ModalDayPicker from '../components/ui/Modal/ModalDayPicker.js';
import ModalTabMove from '../components/ui/Modal/ModalTabMove.js';

import { AnimatePresence } from 'framer-motion';

function DetailTask() {
    const { taskId } = useParams();
    const {
        tab,
        task,
        title,
        detail,
        starred,
        dateTime,
        isCompleted,
        taskTabId,
        modalTab,
    } = useDetailTask(taskId);

    const {
        deadline,
        date,
        hasDate,
        hasTime,
        time,
        toggleCalendar,
        toggleTime,
    } = dateTime;

    const dl = deadline.value ? new Date(deadline.value) : null;

    const navigate = useNavigate();

    if (!task) {
        return <LoadingPage />;
    }

    return (
        <motion.div
            className="flex h-screen w-full flex-col items-center justify-between"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.3,
                ease: 'easeInOut',
            }}
        >
            <Field className="container m-4! bg-transparent">
                <div className="mx-2! mt-2! mb-6! flex w-full items-center justify-between">
                    <FaArrowLeft
                        size={20}
                        className="cursor-pointer hover:scale-110"
                        onClick={() => navigate(`/${tab?.[0]?.id}`)}
                    />
                    <div className="flex items-center justify-center gap-4">
                        <StarCheck
                            checked={starred.value}
                            onChange={(v) => starred.set(v)}
                        />
                        <BsThreeDotsVertical size={20} />
                    </div>
                </div>
                <div
                    id="tab-select"
                    className="flex w-fit cursor-pointer items-center justify-center gap-2 rounded-full bg-transparent px-4! text-xl font-bold text-blue-400! select-none hover:backdrop-invert-10 focus:outline-none"
                    onClick={() => {
                        //TODO
                        modalTab.open();
                    }}
                >
                    {tab?.map(
                        (tab) =>
                            tab.id === taskTabId.value && (
                                <p
                                    key={tab.id}
                                    className="text-blue-400!"
                                >
                                    {tab.name}
                                </p>
                            )
                    )}
                    <div className="rotate-90 text-2xl text-blue-400!">›</div>
                </div>

                <input
                    type="text"
                    name="Title Task"
                    id="title-task-detail"
                    value={title.value}
                    onChange={title.set}
                    className="px-4! py-6! text-2xl focus:underline focus:outline-none"
                    maxLength={50}
                />

                <div className="flex w-full gap-4 px-4! py-2! hover:backdrop-brightness-90">
                    <CgDetailsMore size={20} />
                    <textarea
                        ref={detail.ref}
                        name="Task Detail"
                        id="task-detail-details"
                        className="flex-1 resize-none focus:outline-none"
                        placeholder="Tambahkan detail"
                        value={detail.value || ''}
                        rows={1}
                        onInput={detail.set}
                    ></textarea>
                </div>
                <div
                    className="flex w-full items-center gap-4 px-4! py-2! hover:backdrop-brightness-90"
                    onClick={toggleCalendar.open}
                >
                    <IoMdTime size={20} />
                    {hasDate ? (
                        <motion.div
                            className="flex w-fit items-center gap-2 border-2 p-2! text-[14px] font-bold"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{
                                duration: 0.3,
                                ease: 'easeInOut',
                            }}
                        >
                            <p>
                                {dl &&
                                    formatCustomDate(dl.toLocaleDateString())}
                            </p>
                            {hasTime && (
                                <p className="m-0">{`${String(dl?.getHours()).padStart(2, '0')}:${String(
                                    dl?.getMinutes()
                                ).padStart(2, '0')}`}</p>
                            )}
                            <div
                                className="flex cursor-pointer items-center justify-center transition! duration-300 ease-in-out hover:scale-125"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    date.unSubmit();
                                }}
                            >
                                <RxCross2 size={18} />
                            </div>
                        </motion.div>
                    ) : (
                        <p className="flex-1">Tambahkan tanggal/waktu</p>
                    )}
                </div>
            </Field>
            <Field className="container m-4! flex items-end bg-transparent">
                <button
                    type="button"
                    className="cursor-pointer rounded-full p-2! tracking-wider text-blue-400! text-shadow-2xs hover:backdrop-invert-10"
                    onClick={() => {}}
                >
                    {isCompleted ? 'Tandai belum selesai' : 'Tandai Selesai'}
                </button>
            </Field>
            {toggleCalendar.isOpen && (
                <ModalDayPicker
                    toggleCalendar={toggleCalendar.close}
                    selected={deadline.value}
                    setSelected={deadline.setValue}
                    selectedTime={deadline.value}
                    setSelectedTime={deadline.setValue}
                    isOpenTime={toggleTime.isOpen}
                    isSubmitTime={hasTime}
                    openTime={toggleTime.open}
                    closeTime={toggleTime.close}
                    onHandleSubmit={date.submit}
                    onHandleSubmitTime={time.submit}
                    unSubmitTime={time.unSubmit}
                />
            )}
            <AnimatePresence>
                {modalTab.isOpen && (
                    <ModalTabMove
                        tab={tab}
                        id={taskTabId.value}
                        close={modalTab.close}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default DetailTask;
