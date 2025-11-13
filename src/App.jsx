import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/Theme';
import useTheme from './hooks/useTheme';

function App() {
    const [theme, toggleTheme] = useTheme();

    return (
        <ThemeProvider value={{ theme, toggleTheme }}>
            <div className="App min-h-screen min-w-screen">
                <AppRoutes />
            </div>
        </ThemeProvider>
    );
}

export default App;
