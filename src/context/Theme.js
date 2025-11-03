import { createContext } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ThemeContext.Provider;
const ThemeConsumer = ThemeContext.Consumer;

export { ThemeConsumer, ThemeProvider, ThemeContext}