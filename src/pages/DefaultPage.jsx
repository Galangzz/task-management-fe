import React from 'react';
import Header from '../components/layout/Header';
import Navbar from '../components/layout/Navbar';
import ModalTaskTitle from '../components/specific/ModalTaskTitle';
import TaskContent from '../components/layout/TaskContent';
import AddButton from '../components/ui/AddButton';
import ModalNewTask from '../components/specific/ModalNewTask';
import LoadingPage from '../components/ui/LoadingPage';
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
        // setIsLoadingTitle,
        isLoadedTaskList,
        // setIsLoadedTaskList,
        errTitle,
        setErrTitle,
        handleSubmitTitleList,
        handleChecked,
    } = useDefaultPage();

    if (isLoadedTaskList) {
        return <LoadingPage />;
    }
    return (
        <div className="relative w-screen min-h-screen flex flex-col">
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

            {isOpenModalTask && <ModalNewTask setIsOpenModalTask={setIsOpenModalTask} />}

            <TaskContent
                task={task ?? {}}
                isLoading={isLoadedTaskList}
                handleChecked={handleChecked}
            />

            <AddButton onClick={() => setIsOpenModalTask(true)} />
                
        </div>
    );
}

export default DefaultPage;
