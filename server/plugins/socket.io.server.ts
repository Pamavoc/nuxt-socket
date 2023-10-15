import { Server } from 'socket.io';
import { SocketEvent } from "~/utils/SocketEvent";

let count = 0;
const socketPort = useRuntimeConfig().public.socketPort;

export default defineNitroPlugin((nitroApp)=> {
    const socketServer = new Server(socketPort, {   
        serveClient: false,
        cors: { origin: '*'}
    });

    socketServer.on('connection', (socket) => {
        console.log('Socket connected', count);
        socket.emit(SocketEvent.new_count, count++)

        socket.on(SocketEvent.up, (message: { value: number}) => {
            count = count + message.value;
            socketServer.emit(SocketEvent.new_count, count)
        })

        socket.on(SocketEvent.down, (message: { value: number}) => {
            count = count - message.value;
            socketServer.emit(SocketEvent.new_count, count)
        })
    })
})