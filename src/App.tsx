import React, { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes.js';
import { ThemeProvider } from './context/Theme.js';
import useTheme from './hooks/useTheme.js';
import { ToastContainer } from 'react-toastify';
import useToast from './hooks/useToast.js';
import { ToastProvider } from './context/Toast.js';
import { getLoggedUser } from './services/authService.js';
import LoadingPage from './components/ui/Loading/LoadingPage.js';
import AuthRoutes from './routes/AuthRoutes.js';

function App() {
    const [theme, toggleTheme] = useTheme();
    const toast = useToast();

    const [user, setUser] = useState<string | null>(null);
    const [initialize, setInitialize] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const checkUserLogged = async () => {
            try {
                const { id } = await getLoggedUser();
                if (id ) {
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
        if(!isMounted) return
        checkUserLogged();

        return () => {
            isMounted = false;
        };
    }, []);

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

    if (!user) {
        return (
            <ThemeProvider value={{ theme, toggleTheme }}>
                <ToastProvider value={{ toast }}>
                    <div className="App min-h-screen w-screen">
                        <AuthRoutes loginSuccess={onLoginSuccess}/>
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
                </ToastProvider>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider value={{ theme, toggleTheme }}>
            <ToastProvider value={{ toast }}>
                <div className="App min-h-screen w-screen">
                    <AppRoutes />
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
            </ToastProvider>
        </ThemeProvider>
    );
}

export default App;
