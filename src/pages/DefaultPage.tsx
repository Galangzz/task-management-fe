import React, { lazy } from 'react';
import Header from '../components/layout/Header.js';
import Navbar from '../components/layout/Navbar/Navbar.js';
const ModalTaskTitle = lazy(
    () => import('../components/ui/Modal/ModalTaskTitle.js')
);
import TaskContent from '../components/TaskContent/TaskContent.js';
import AddButton from '../components/ui/AddButton.js';
const ModalNewTask = lazy(
    () => import('../components/ui/Modal/ModalNewTask.js')
);

import useDefaultPage from '../hooks/useDefaultPage.js';
import { useParams } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';
const  ForbiddenPage = lazy(() => import('./ForbiddenPage.js'))

function DefaultPage() {
    const { id } = useParams();
    const {
        tabs,
        tab,
        tasks,
        errNav,

        //newTabModal
        titleList,
        setTitleList,
        isOpen,
        setIsOpen,
        isLoading,
        error,
        setError,
        submit,
        clearTitleModal,

        //new task modal
        isOpenModalTask,
        setIsOpenModalTask,

        //loading task
        isLoadedTaskList,

        //action
        handleChecked,
        handleStarred,
    } = useDefaultPage(id);

    if (errNav === 403) {
        return <ForbiddenPage />;
    }

    return (
        <div className="relative z-1 flex min-h-screen w-full flex-col">
            <Header />
            <Navbar
                tabs={tabs}
                addList={() => setIsOpen(true)}
                tabId={id!}
            />

            <TaskContent
                tasks={tasks}
                tab={tab}
                isLoading={isLoadedTaskList}
                handleChecked={handleChecked}
                handleStarred={handleStarred}
            />

            <AnimatePresence>
                {isOpen && (
                    <ModalTaskTitle
                        titleList={titleList}
                        setTitleList={setTitleList}
                        setToggleTitle={() => clearTitleModal(false)}
                        handleSubmitTitleList={submit}
                        err={error}
                        setErr={setError}
                        isLoading={isLoading}
                        tabs={tabs?.map((t) => t.name) ?? []}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpenModalTask && (
                    <ModalNewTask
                        setIsOpenModalTask={setIsOpenModalTask}
                        tabId={id!}
                    />
                )}
            </AnimatePresence>

            {id !== 'starred-task' && (
                <AddButton
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpenModalTask(true);
                    }}
                />
            )}
        </div>
    );
}

export default DefaultPage;
