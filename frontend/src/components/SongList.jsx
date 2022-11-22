import react, {useEffect, useState} from "react";

export default function SongList({
    songs,
    onSongSelect,
}){

    return (
        <div style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column"
        }}>
            {songs.map(s => (
                <button key={s.id} onClick={() => onSongSelect(s)} style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <img style={{height: "5rem", width: "5rem"}} src={s.album.images[0].url} />
                    {s.name}
                </button>
            ))}
        </div>
    )
}