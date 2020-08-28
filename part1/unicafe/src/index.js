import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({good, neutral, bad, clicks}) => {

    if (clicks === 0){
        return(
            <>
                <div>No feedback given</div>
            </>
        )
    }
    
    return (
        <>
            <p>good: {good}</p>
            <p>neutral: {neutral}</p>
            <p>bad: {bad}</p>
            <p>average: {(good-bad)/clicks}</p>
            <p>positive: {good/clicks}%</p>
        </>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [clicks, setClicks] = useState(0)

    const plus1 = (val, setVal) => {
        return () => {
            setClicks(clicks+1)
            setVal(val+1)
        }
    }

    return (
        <>
            <h1>Unicafe give feedback</h1>
            <button onClick={plus1(good, setGood)}>good</button>
            <button onClick={plus1(neutral, setNeutral)}>neutal</button>
            <button onClick={plus1(bad, setBad)}>bad</button>
            <h1>statistic</h1>
            <Statistic good={good} neutral={neutral} bad={bad} clicks={clicks}></Statistic>
        </>
    )
}

ReactDOM.render(
    <App />,document.getElementById('root')
);

