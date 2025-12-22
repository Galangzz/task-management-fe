import { createContext } from 'react';

type ThemeContextType = {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>(null as unknown as ThemeContextType);

const ThemeProvider = ThemeContext.Provider;
const ThemeConsumer = ThemeContext.Consumer;

export { ThemeConsumer, ThemeProvider, ThemeContext };
