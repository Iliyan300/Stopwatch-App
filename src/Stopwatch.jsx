import React, {useState, useEffect, useRef} from 'react'

function Stopwatch() {

// useState hook - when updates it causes the component to rerender
const [isRunning, setIsRunning] = useState(false);
const [elapsedTime, setElapsedTime] = useState(0);

// useRef hook - when updates doesn't cause the component to rerender
const intervalIdRef = useRef(null); // - object {property "current": value}
const startTimeRef = useRef(0);

// useEffect hook - runs every time the "isRunning" variable updates.
useEffect(() => {

    if(isRunning) {

       intervalIdRef.current = setInterval(() => {

            setElapsedTime(Date.now() - startTimeRef.current)
            
        }, 10)

        
        //clean up function

        return () => {

            clearInterval(intervalIdRef.current) 
            
        }
    }

},[isRunning]);

function start() {

    setIsRunning(true);
   startTimeRef.current = Date.now() - elapsedTime;
   

}

function stop() {

setIsRunning(false);

}

function reset() {

setElapsedTime(0);
setIsRunning(false);

}

function formatTime() {

let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
let seconds = Math.floor(elapsedTime / (1000) % 60);
let miliseconds = Math.floor((elapsedTime % 1000) / 10)

hours = String(hours).padStart(2,"0"); 
minutes = String(minutes).padStart(2,"0");
seconds = String(seconds).padStart(2,"0");
miliseconds = String(miliseconds).padStart(2,"0");


return `${minutes}:${seconds}:${miliseconds}`;

}


return(<>

<div className='stopwatch'>
    <div className='display'>{formatTime()}</div>
    <div className="controls">
        <button onClick={start} className='start-button'>Start</button>
        <button onClick={stop} className='stop-button'>Stop</button>
        <button onClick={reset} className='reset-button'>Reset</button>


    </div>
</div>

</>)
}

export default Stopwatch