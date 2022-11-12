import {Link} from "react-router-dom"
import {useState} from "react"

export default function Home(){
    const [count, setCount] = useState(0);
    return (
        <>
        <h1>Home Page</h1>
        <p>Sweet homepage with cool graphics</p>
        <button onClick={() => setCount(count+1)}>Count: {count}</button>
        <Link to="/request-song"><button>Request a Song</button></Link>
        </>
    )
}