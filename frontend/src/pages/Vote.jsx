import {useEffect, useState} from "react";
import io from 'socket.io-client'
import TotalVotes from "../components/TotalVotes";
import VotingCard from "../components/VotingCard";

const socket = io(import.meta.env.DEV ? "localhost:8080" : "ws://www.stereolabs.lol")

export default function Vote() {
    const [songs, setSongs] = useState([]);
    console.log("Hello")

    useEffect(() => {
        async function loadRequests() {
            const data = await fetch('/api/requests');
            const songs = await data.json()
            console.log("start")
            console.log(songs)
            console.log("end")
            setSongs(songs);
        }
        loadRequests();
    }, []);

    useEffect(() => {
        socket.on('update', (data) => {
            console.log(data);
            setSongs(data);
        });

        return () => {
            socket.off('connect');
        }
    }, []);


    async function upvote_req(songid){
        const data = await fetch(`/api/upvote/${songid}`, {method:"POST"});

    };
    async function downvote_req(songid){
        const data = await fetch(`/api/downvote/${songid}`, {method:"POST"});

    };

    const totalVotes = songs.reduce((sum, song) => sum + song.vote_count, 0) ?? 1;
    
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div>
                {songs.sort((a,b)=>a.vote_count < b.vote_count ? 1 : -1).map(song => (
                    <VotingCard
                        key={song.request_id}
                        song={song}
                        onUpvote = {()=>{
                            upvote_req(song.request_id)
                        }}
                        onDownvote = {()=>{
                            downvote_req(song.request_id)
                        }}
                    />
                ))}
            </div>
            <div>
                <TotalVotes
                    totalVotes={totalVotes}
                />
            </div>
        </div>
    )
}
