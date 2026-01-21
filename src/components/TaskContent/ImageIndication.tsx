import React, { useContext } from 'react';
import { motion } from 'framer-motion';

import completedTaskDark from '../../assets/completed-task-dark.svg';
import completedTaskLight from '../../assets/completed-task-light.svg';
import emptyNoteDark from '../../assets/empty-note-dark.svg';
import emptyNoteLight from '../../assets/empty-note-light.svg';
import { ThemeContext } from '../../context/Theme.js';
function ImageIndication({
    showCompleted,
    tabId,
}: {
    showCompleted: boolean;
    tabId: string;
}) {
    const { theme } = useContext(ThemeContext);

    return (
        <motion.div
            className={`mx-auto flex aspect-3/4 max-h-80 min-h-36 w-full max-w-sm flex-col items-center justify-center gap-8 transition-opacity! duration-500! ease-in-out! md:max-h-96 lg:max-h-120`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                ease: 'easeIn',
                duration: 0.3,
            }}
            title="Task Notification Image"
        >
            <img
                src={
                    theme === 'dark'
                        ? showCompleted
                            ? completedTaskDark
                            : emptyNoteDark
                        : showCompleted
                          ? completedTaskLight
                          : emptyNoteLight
                }
                alt="Task Notification Image"
                aria-label="Task Notification Image"
                className="aspect-3/4 max-h-80 min-h-36 w-auto object-contain p-2!"
                fetchPriority="high"
            />
            <p className="text-fluid-lg md:text-fluid-xl w-full text-center font-semibold tracking-widest">
                {showCompleted ? (
                    <>
                        Task Telah Selesai
                        <br />
                        Kerja Bagus
                    </>
                ) : tabId === 'starred-task' ? (
                    'Tidak ada catatan yang dibintangi'
                ) : (
                    'Task Kosong'
                )}
            </p>
        </motion.div>
    );
}

export default ImageIndication;
