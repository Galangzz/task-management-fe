import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Field from '../components/ui/Field.js';
import { useTaskStore } from '../hooks/useTaskStore.js';
import { CgDetailsMore } from 'react-icons/cg';
import { IoMdTime } from 'react-icons/io';
import { FaArrowLeft } from 'react-icons/fa';
import StarCheck from '../components/ui/StarCheck.js';
import { BsThreeDotsVertical } from 'react-icons/bs';
import type { ITasks } from '../types/index.js';

function DetailTask() {
    const { id, taskId } = useParams();
    const { tabs, task, loadTaskList } = useTaskStore();

    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [tasks, setTasks] = useState<ITasks>();
    console.log({ tasks });

    const detailRef = useRef<HTMLTextAreaElement>(null);

    const navigate = useNavigate();

    console.log({ task });
    console.log({ id, taskId });
    useEffect(() => {
        let isMounted = true;
        const getTask = async () => {
            try {
                await loadTaskList(id!);
            } catch {
                navigate('/', { replace: true });
                return;
            }
        };
        if (isMounted) {
            getTask();
        }
        return () => {
            isMounted = false;
        };
    }, [id, loadTaskList]);

    useEffect(() => {
        const foundTask = task?.tasks.find((t) => t.id === taskId);
        if (!foundTask) {
            navigate(`/${id}`, { replace: true });
            return;
        }
        setTasks(foundTask);
        const foundTitle = tasks?.title;
        const detail = tasks?.detail;
        if (foundTitle) {
            setTitle(foundTitle);
        }
        if (detail) {
            setDetail(detail);
        }
    }, [task, taskId, tasks]);

    useEffect(() => {
        if (detail) {
            autoResize();
        }
    }, [detail]);

    const autoResize = useCallback(() => {
        const el = detailRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    }, [detail]);

    const handleInputDetail = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            autoResize();
            setDetail(e.target.value);
        },
        [setDetail]
    );
    if (!task) {
        return null;
    }

    return (
        <div className="flex h-screen w-full items-start justify-center">
            <Field className="container m-4! bg-transparent!">
                <div className="mx-2! mt-2! mb-6! flex w-full items-center justify-between">
                    <FaArrowLeft
                        size={20}
                        className="cursor-pointer hover:scale-110"
                        onClick={() => navigate(`/${id}`)}
                    />
                    <div className="flex items-center justify-center gap-4">
                        <StarCheck checked={tasks?.starred} />
                        <BsThreeDotsVertical size={20} />
                    </div>
                </div>
                <select
                    name="tab-select"
                    id="tab-select"
                    className="w-fit bg-transparent px-4! text-xl font-bold text-blue-400! focus:outline-none"
                >
                    {tabs?.map((tab) => (
                        <option
                            key={tab.id}
                            value={tab.id}
                        >
                            {tab.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    name="Title Task"
                    id="title-task-detail"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="px-4! py-6! text-2xl focus:underline focus:outline-none"
                />

                <div className="flex w-full gap-4 px-4! py-2! hover:backdrop-brightness-90">
                    <CgDetailsMore size={20} />
                    <textarea
                        ref={detailRef}
                        name="Task Detail"
                        id="task-detail-details"
                        className="flex-1 resize-none focus:outline-none"
                        placeholder="Tambahkan detail"
                        value={detail}
                        rows={1}
                        onInput={handleInputDetail}
                    ></textarea>
                </div>
                <div className="flex w-full items-center gap-4 px-4! py-2! hover:backdrop-brightness-90">
                    <IoMdTime size={20} />
                    <p className="flex-1">Tambahkan tanggal/waktu</p>
                </div>
            </Field>
        </div>
    );
}

export default DetailTask;
