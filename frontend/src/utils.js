// convert song milliseconds to "m:ss"
export function formattedLength(ms){
    const totalSeconds = ms / 1000;
    const minutes = Math.floor(totalSeconds / 60)
    const remainingSeconds = Math.round(totalSeconds % 60);
    // pad with zero if necessary
    const formattedSeconds = (remainingSeconds).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
    return `${minutes}:${formattedSeconds}`
}

export function key(keyNum){
    // not a music theory guy. I know for sure 0 = C, I guessed on the rest
    if(keyNum < 0 || keyNum > 11) return "Unknown"
    const keys = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B']
    return keys[keyNum];
}