import React, { lazy, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from './context/Theme.js';

import { getLoggedUser } from './services/authService.js';

import useTheme from './hooks/useTheme.js';
import { useTabsStore } from './stores/useTabStore.js';
import { useUserStore } from './stores/useUserStore.js';

const LoadingPage = lazy(
    () => import('./components/ui/Loading/LoadingPage.js')
);
const AuthRoutes = lazy(() => import('./routes/AuthRoutes.js'));
const AppRoutes = lazy(() => import('./routes/AppRoutes.js'));

function App() {
    const [theme, toggleTheme] = useTheme();

    const { user, checkUserLogged } = useUserStore();
    const [initialize, setInitialize] = useState(true);

    const { tabs, setTabs, currentTabId, setCurrentTabId } = useTabsStore();


    useEffect(() => {
        let isMounted = true;

        if (!isMounted) return;
        checkUserLogged(isMounted).then(() => {
            setInitialize(false);
        });

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (user && !tabs) {
            setTabs();
        }
    }, [user, tabs]);

    useEffect(() => {
        if (user && tabs && tabs.length > 0) {
            const tab = tabs
                .map((tab) => (tab.deletePermission == false ? tab.id : ''))
                .filter((id) => id)[0] as string;
            setCurrentTabId(tab);
        }
    }, [tabs]);

    async function onLoginSuccess() {
        await checkUserLogged(true);
    }

    if (initialize || (user && !tabs && !currentTabId)) {
        return <LoadingPage />;
    }

    if (!user) {
        return (
            <ThemeProvider value={{ theme, toggleTheme }}>
                <div className="App min-h-screen w-screen">
                    <AuthRoutes loginSuccess={onLoginSuccess} />
                    <ToastContainer
                        autoClose={3000}
                        toastClassName={'bg-(--toast-bg)!'}
                        position="bottom-left"
                        pauseOnFocusLoss={false}
                        pauseOnHover={false}
                        closeButton={false}
                        stacked
                        draggable={false}
                    />
                </div>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider value={{ theme, toggleTheme }}>
            <div className="App min-h-screen w-screen">
                <AppRoutes tabId={currentTabId} />
                <ToastContainer
                    autoClose={3000}
                    toastClassName={'bg-(--toast-bg)!'}
                    position="bottom-left"
                    pauseOnFocusLoss={false}
                    pauseOnHover={false}
                    closeButton={false}
                    stacked
                    draggable={false}
                />
            </div>
        </ThemeProvider>
    );
}

export default App;
