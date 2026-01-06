import React from 'react';
import Field from '../Field.js';
import type { ITabs } from '../../../types/index.js';
import { motion } from 'framer-motion';

export default function ModalTabMove({
    tab,
    id,
    close,
}: {
    tab: ITabs[] | null;
    id: string | null;
    close: () => void;
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
                className="w-full flex items-center justify-center bg-(--background-header)"
                transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                    type: 'spring',
                }}
            >
                <Field className="bg-transparent">
                    <h1 className="w-full">Pindahkan task ke tab</h1>
                    {tab?.map((tab) => (
                        <div
                            key={tab.id}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="checkbox"
                                id={tab.id}
                                name={tab.id}
                                checked={tab.id === id}
                            />
                            <label htmlFor={tab.id}>{tab.name}</label>
                        </div>
                    ))}
                </Field>
            </motion.div>
        </div>
    );
}
