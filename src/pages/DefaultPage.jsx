import React, { lazy } from 'react';
import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar/Navbar';
import ModalTaskTitle from '../components/specific/ModalTaskTitle';
import TaskContent from '../components/layout/TaskContent';
import AddButton from '../components/ui/AddButton';
import ModalNewTask from '../components/specific/ModalNewTask';
const LoadingPage = lazy(() => import('../components/ui/LoadingPage'));
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
        errTitle,
        setErrTitle,
        handleSubmitTitleList,
        handleChecked,
    } = useDefaultPage();
    console.log({ DefaultPagesTask: task });
    if (isLoadedTaskList) {
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
                        setErrTitle('');
                        setTitleList('');
                    }}
                    handleSubmitTitleList={handleSubmitTitleList}
                    err={errTitle}
                    setErr={setErrTitle}
                    isLoading={isLoadingTitle}
                />
            )}

            {isOpenModalTask && (
                <ModalNewTask setIsOpenModalTask={setIsOpenModalTask} />
            )}

            <TaskContent
                task={task}
                isLoading={isLoadedTaskList}
                handleChecked={handleChecked}
            />

            <AddButton onClick={() => setIsOpenModalTask(true)} />
        </div>
    );
}

export default DefaultPage;
