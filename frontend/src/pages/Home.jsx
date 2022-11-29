import {Link} from "react-router-dom"
import {useState} from "react"

export default function Home(){
    const [count, setCount] = useState(0);
    return (
        <>
        <h1>Home Page</h1>
        <p>Sweet homepage with cool graphics</p>
        <Link to="/request-song"><button style = {{backgroundColor: "#ff683c", height: "2em", width: "14em", fontSize: "20px", borderRadius: "0.5em"}}><b>Request a Song</b></button></Link>
        <button style = {{backgroundColor: "#ff683c", height: "2em", width: "8em", fontSize: "20px", borderRadius: "0.5em"}}><b>Vote</b></button>
        <button style = {{backgroundColor: "#ff683c", height: "2em", width: "8em", fontSize: "20px", borderRadius: "0.5em"}} onClick={() => setCount(count+1)}><b>Count: {count}</b></button>
        </>
    )
}