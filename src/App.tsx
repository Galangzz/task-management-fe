import React from 'react';
import AppRoutes from './routes/AppRoutes.js';
import { ThemeProvider } from './context/Theme.js';
import useTheme from './hooks/useTheme.js';
import { ToastContainer } from 'react-toastify';
import useToast from './hooks/useToast.js';
import { ToastProvider } from './context/Toast.js';

function App() {
    const [theme, toggleTheme] = useTheme();
    const [toast] = useToast();

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
