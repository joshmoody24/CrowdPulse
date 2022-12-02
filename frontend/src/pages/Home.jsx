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
                <div className="col text-center">
                    <img src={Crowd} className="img-fluid" alt="crowd_moshing" />
                </div>
            </div>
            <div className="row mt-5">
                <div className="col text-center">
                    <img src={Vote} alt="vote_icon" />
                    <p className="mt-2"><b>Cast Your Vote for the Next Song</b></p>
                </div>
                <div className="col text-center">
                    <Link to="/request-song"><img src={Submit} alt="submit_icon" /></Link>
                    <p className="mt-2"><b>Submit Request for the Next Song</b></p>
                </div>
            </div>
        </div>
        </>
    )
}