export default function VoteOption({
    totalVotes,
}){
    if(!totalVotes) return <p>0 Votes</p>

    return (
        <p className="artistname">{totalVotes} Votes</p>
    )
}