import {Link} from "react-router-dom"
import {useState} from "react"
import Crowd from "../assets/crowd 1.png"
import Vote from "../assets/vote 1.png"
import Submit from "../assets/submit 1.png"

export default function Home(){
    const [count, setCount] = useState(0);
    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col">
                    <img src={Crowd} alt="crowd_moshing" />
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                    <img src={Vote} alt="vote_icon" />
                    <p>Cast Your Vote for the Next Song</p>
                </div>
                <div className="col text-center">
                    <img src={Submit} alt="submit_icon" />
                    <p>Submit Request for the Next Song</p>
                </div>
            </div>
        </div>
        </>
    )
}