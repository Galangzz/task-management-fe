import { createContext } from 'react';

const ToastContext = createContext();
const ToastProvider = ToastContext.Provider;

export  {ToastProvider, ToastContext};
