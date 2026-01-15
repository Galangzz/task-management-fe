import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTaskStore } from '../useTaskStore.js';
import { getTaskTabById } from '../../services/taskTabsService.js';
import ApiError from '../../errors/ApiError.js';

function useTabNavigation(setIsLoadedTaskList: (value: React.SetStateAction<boolean>) => void) {
    const navigate = useNavigate();
    const location = useLocation();
    const previousTabRef = useRef('');
    const isInitialMount = useRef(true);

    const { setTabs, setCurrentTabId, loadTaskList, resetOnTabChange } =
        useTaskStore();

    useEffect(() => {
        let isCancelled = false;
        const currentTab = location.pathname.split('/')[1] || 'main-task';

        if (previousTabRef.current === currentTab && !isInitialMount.current) {
            return;
        }

        const isFirstLoad = isInitialMount.current;
        isInitialMount.current = false;

        console.log(
            `Tab: ${previousTabRef.current} → ${currentTab} (firstLoad: ${isFirstLoad})`
        );
        const run = async () => {
            if (
                previousTabRef.current !== '' &&
                previousTabRef.current !== currentTab
            ) {
                setIsLoadedTaskList(true);
                resetOnTabChange(currentTab);
            } else {
                try {
                    const data = await getTaskTabById(currentTab);
                    console.log({ data });
                    if (isCancelled) return;

                    setCurrentTabId(currentTab);
                    loadTaskList(currentTab);
                } catch (error) {
                    if(error instanceof ApiError){
                        if (error.status == 404) {
                            navigate('/', { replace: true });
                            return;
                        }
                    }
                }
            }

            previousTabRef.current = currentTab;
        };
        run();
        return () => {
            isCancelled = true;
        };
    }, [location.pathname]);

    return null
}
export default useTabNavigation;
