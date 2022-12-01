import {useState, useEffect} from "react";
import io from 'socket.io-client';

const socket = io("localhost:8080");

export default function Recommendations(){

    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('update', (data) => {
            console.log(data);
        });

        return () => {
            socket.off('connect');
        }
    });

    return (
        <div>
            <div>Hey there!</div>
            <div>Connection status: { isConnected ? 'True!' : 'False.' }</div>
        </div>
    );
}