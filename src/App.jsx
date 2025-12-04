import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/Theme';
import useTheme from './hooks/useTheme';
import { ToastContainer } from 'react-toastify';
import useToast from './hooks/useToast';
import { ToastProvider } from './context/Toast';

function App() {
    const [theme, toggleTheme] = useTheme();
    const [toast] = useToast();

    return (
        <ThemeProvider value={{ theme, toggleTheme }}>
            <ToastProvider value={{ toast }}>
                <div className="App min-h-screen w-screen ">
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
