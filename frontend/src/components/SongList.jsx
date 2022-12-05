import react, {useEffect, useState} from "react";

export default function SongList({
    songs,
    onSongSelect,
}){

    return (
        <div className="container mt-2">
            {songs.map(s => (
                <button key={s.id} onClick={() => onSongSelect(s)} className="row w-100 rowbutton bg-white rounded" style={{marginLeft:0}}>
                    <div className="col-6" style={{textAlign: "left", alignSelf: "center"}}>
                        <p>{s.name}</p>
                        <p>{s.artists[0].name}</p>
                    </div>
                    <div className="col-6 text-right my-1">
                        <img src={s.album.images[0].url} style={{height: "5rem", width: "5rem"}} className="align-self-end rounded"/>
                    </div>
                </button>
            ))}
        </div>
    )
}