import { io } from 'socket.io-client';

export const socket = io('http://localhost:3000', {
    transports: ['websocket'], 
    autoConnect: true, 
    reconnectionAttempts: 5, 
    reconnectionDelay: 1000, 
    reconnectionDelayMax: 5000,
    });
