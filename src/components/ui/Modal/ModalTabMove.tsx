import React from 'react';
import Field from '../Field.js';
import type { ITabs } from '../../../types/index.js';
import { motion } from 'framer-motion';

export default function ModalTabMove({
    tab,
    id,
    close,
    handleChange,
}: {
    tab: ITabs[] | null;
    id: string | null;
    close: () => void;
    handleChange: (id: string) => void;
}) {
    return (
        <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-end bg-black/30 backdrop-brightness-75"
            onClick={(e) => {
                e.stopPropagation();
                close();
            }}
        >
            <motion.div
                initial={{ y: 200 }}
                animate={{ y: 0 }}
                exit={{ y: 200 }}
                className="flex w-full items-center justify-center bg-(--background-header)"
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                    type: 'spring',
                }}
            >
                <Field className="bg-transparent">
                    <h1 className="w-full text-xl font-bold">
                        Pindahkan task ke tab
                    </h1>
                    <hr className="w-full mb-2!" />
                    {tab?.map((tab) => (
                        <div
                            key={tab.id}
                            className={`flex items-center gap-2! px-2! hover:backdrop-invert-10 ${
                                tab.id === id ? 'border backdrop-invert-10' : ''
                            } text-lg tracking-wider`}
                        >
                            <input
                                type="checkbox"
                                id={tab.id}
                                name={tab.id}
                                checked={tab.id === id}
                                onChange={() => {
                                    handleChange(tab.id);
                                    close();
                                }}
                                className="sr-only"
                            />
                            <label
                                htmlFor={tab.id}
                                className="flex-1"
                            >
                                {tab.name}
                            </label>
                        </div>
                    ))}
                </Field>
            </motion.div>
        </div>
    );
}
