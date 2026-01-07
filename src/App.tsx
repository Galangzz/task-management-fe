import React, { lazy, useEffect, useMemo, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from './context/Theme.js';
import { ToastProvider } from './context/Toast.js';

import { getLoggedUser } from './services/authService.js';

import { useTaskStore } from './stores/useTaskStore.js';
import useToast from './hooks/useToast.js';
import useTheme from './hooks/useTheme.js';
import { useTabsStore } from './stores/useTabStore.js';

const LoadingPage = lazy(
    () => import('./components/ui/Loading/LoadingPage.js')
);
const AuthRoutes = lazy(() => import('./routes/AuthRoutes.js'));
const AppRoutes = lazy(() => import('./routes/AppRoutes.js'));

function App() {
    const [theme, toggleTheme] = useTheme();

    const [user, setUser] = useState<string | null>(null);
    const [initialize, setInitialize] = useState(true);
    const [tabId, setTabId] = useState('');

    const { tabs, setTabs } = useTabsStore();

    useEffect(() => {
        let isMounted = true;
        const checkUserLogged = async () => {
            try {
                const { id } = await getLoggedUser();
                if (id && isMounted) {
                    setUser(id as string);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            } finally {
                setInitialize(false);
            }
        };
        if (!isMounted) return;
        checkUserLogged();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (user) {
            setTabs();
        }
    }, [user]);

    useEffect(() => {
        if (user && tabs && tabs.length > 0) {
            setTabId(() => {
                const tab = tabs
                    .map((tab) => (tab.deletePermission == false ? tab.id : ''))
                    .filter((id) => id)[0];
                return tab!;
            });
        }
    }, [tabs]);

    async function onLoginSuccess() {
        const { id } = await getLoggedUser();
        if (id) {
            setUser(id as string);
        }
    }

    if (initialize) {
        //todo
        // return <InitializeLoading />;
        return <LoadingPage />;
    }

    if (user && tabId === '') {
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
                <AppRoutes tabId={tabId!} />
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
