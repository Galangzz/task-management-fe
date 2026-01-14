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
const LoadingPage = lazy(
    () => import('../components/ui/Loading/LoadingPage.js')
);
import useDefaultPage from '../hooks/useDefaultPage.js';
import { useParams } from 'react-router-dom';

function DefaultPage() {
    const { id } = useParams();
    const {
        tabs,
        tab,
        tasks,

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

   

    return (
        <div className="relative flex h-full w-full flex-col">
            <Header />
            <Navbar
                tabs={tabs}
                addList={() => setIsOpen(true)}
                tabId={id!}
            />

            {isOpen && (
                <ModalTaskTitle
                    titleList={titleList}
                    //Check
                    setTitleList={setTitleList}
                    setToggleTitle={() => clearTitleModal(false)}
                    handleSubmitTitleList={submit}
                    err={error}
                    setErr={setError}
                    isLoading={isLoading}
                    tabs={tabs?.map((t) => t.name) ?? []}
                />
            )}

            {isOpenModalTask && (
                <ModalNewTask
                    setIsOpenModalTask={setIsOpenModalTask}
                    tabId={id!}
                />
            )}

            <TaskContent
                tasks={tasks}
                tab={tab}
                isLoading={isLoadedTaskList}
                handleChecked={handleChecked}
                handleStarred={handleStarred}
            />

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
