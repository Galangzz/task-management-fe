import React, { lazy, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from './context/Theme.js';

import { socket } from './services/socket/socket.js';

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

    //socket

    useEffect(() => {
        if (!user) return;

        if (socket.connected) {
            socket.emit('join-user', user.id);
        }

        const handleReconnect = () => {
            socket.emit('join-user', user.id);
        };

        socket.on('connect', handleReconnect);

        return () => {
            socket.off('connect', handleReconnect);
        };
    }, [user]);

    useEffect(() => {
        socket.on('deadline-reminder', (data) => {
            alert(
                `⏰ ${data.title} Now ${new Date(data.deadline).toLocaleString()}`
            );
        });

        return () => {
            socket.off('deadline-reminder');
        };
    }, []);


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
                    <div className="fixed bottom-10 flex justify-center gap-18 whitespace-nowrap">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div
                                key={index}
                                className="animate-float -z-10 h-40 w-40 rotate-45 bg-(--button-text) opacity-20 blur-md"
                                style={{ animationDelay: `${index * 300}ms` }}
                            ></div>
                        ))}
                    </div>
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
                <div className="animate-float fixed top-30 left-10 -z-10 h-60 w-60 rounded-full bg-(--button-text) opacity-20 blur-2xl"></div>
                <div className="animate-float fixed right-50 bottom-30 -z-10 h-60 w-60 rounded-full bg-linear-to-r from-(--button-text)/50 to-(--button-text) opacity-20 blur-2xl delay-500"></div>
                <div className="animate-float fixed right-10 bottom-30 -z-10 h-60 w-60 rounded-full bg-linear-to-r from-(--button-text)/50 to-(--button-text) opacity-20 blur-2xl delay-300"></div>

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
