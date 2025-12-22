import React, { lazy } from 'react';
import Header from '../components/layout/Header.js';
import Navbar from '../components/layout/Navbar/Navbar.js';
const ModalTaskTitle = lazy(
    () => import('../components/ui/Modal/ModalTaskTitle.js')
);
import TaskContent from '../components/layout/TaskContent.js';
import AddButton from '../components/ui/AddButton.js';
const ModalNewTask = lazy(
    () => import('../components/ui/Modal/ModalNewTask.js')
);
const LoadingPage = lazy(
    () => import('../components/ui/Loading/LoadingPage.js')
);
import { useDefaultPage } from '../hooks/useDefaultPage.js';

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
                    tabs={tabs?.map((t) => t.name)}
                />
            )}

            {isOpenModalTask && (
                <ModalNewTask setIsOpenModalTask={setIsOpenModalTask} />
            )}

            <TaskContent
                task={task}
                isLoading={isLoadedTaskList}
                handleChecked={(id: string, value: boolean) =>
                    handleChecked(id, value)
                }
                handleStarred={(id: string, value: boolean) =>
                    handleStarred(id, value)
                }
            />

            <AddButton onClick={() => setIsOpenModalTask(true)} />
        </div>
    );
}

export default DefaultPage;
