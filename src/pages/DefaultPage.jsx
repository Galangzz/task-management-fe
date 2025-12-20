import React, { lazy } from 'react';
import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar/Navbar';
const ModalTaskTitle = lazy(
    () => import('../components/ui/Modal/ModalTaskTitle')
);
import TaskContent from '../components/layout/TaskContent';
import AddButton from '../components/ui/AddButton';
const ModalNewTask = lazy(() => import('../components/ui/Modal/ModalNewTask'));
const LoadingPage = lazy(() => import('../components/ui/Loading/LoadingPage'));
import { useDefaultPage } from '../hooks/useDefaultPage';

function DefaultPage() {
    const {
        tabs,
        task,
        titleList,
        setTitleList,
        isOpenModalTaskTitle,
        setIsOpenModalTaskTitle,
        isOpenModalTask,
        setIsOpenModalTask,
        isLoadingTitle,
        isLoadedTaskList,
        isLoadedPage,
        errTitle,
        setErrTitle,
        handleSubmitTitleList,
        handleChecked,
        handleStarred,
    } = useDefaultPage();
    console.log({ isLoadedTaskList });
    if (isLoadedPage) {
        return <LoadingPage />;
    }
    return (
        <div className="relative flex h-full w-full flex-col">
            <Header />
            <Navbar
                tabs={tabs}
                addList={() => setIsOpenModalTaskTitle(true)}
            />

            {isOpenModalTaskTitle && (
                <ModalTaskTitle
                    titleList={titleList}
                    setTitleList={setTitleList}
                    setToggleTitle={() => {
                        setIsOpenModalTaskTitle(false);
                        setErrTitle(null);
                        setTitleList('');
                    }}
                    handleSubmitTitleList={handleSubmitTitleList}
                    err={errTitle}
                    setErr={setErrTitle}
                    isLoading={isLoadingTitle}
                    tabs={tabs.map((t) => t.name)}
                />
            )}

            {isOpenModalTask && (
                <ModalNewTask setIsOpenModalTask={setIsOpenModalTask} />
            )}

            <TaskContent
                task={task}
                isLoading={isLoadedTaskList}
                handleChecked={handleChecked}
                handleStarred={handleStarred}
            />

            <AddButton onClick={() => setIsOpenModalTask(true)} />
        </div>
    );
}

export default DefaultPage;
