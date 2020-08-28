import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({value, text, suffix}) => {
    return (
        <>
            <th>{text}</th>
            <td>{value}{suffix}</td>
        </>
    )
}

const Statistics = (props) => {
    const {clicks, good, neutral, bad} = props

    if (clicks === 0){
        return (
            <p>No feedback given</p>
        )
    }

    return (
        <>
        <table>
            <tbody>
                <tr><Statistic text="good" value={good}></Statistic></tr>
                <tr><Statistic text="neutral" value={neutral}></Statistic></tr>
                <tr><Statistic text="bad" value={bad}></Statistic></tr>
                <tr><Statistic text="average" 
                    value={Number.parseFloat((good-bad)/clicks).toFixed(1)}>
                    </Statistic></tr>
                <tr>
                    <Statistic text="positive" 
                    value={Number.parseFloat(good/clicks*100).toFixed(1)} suffix="%">
                    </Statistic>
                </tr>
            </tbody>
        </table>
        </>
    )
}

const Button = ({func, text}) => {
    return (
        <button onClick={func}>{text}</button>
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
            <Button func={plus1(good, setGood)} text="good"></Button>
            <Button func={plus1(neutral, setNeutral)} text="neutal"></Button>
            <Button func={plus1(bad, setBad)} text="bad"></Button>

            <h1>statistic</h1>
            <Statistics good={good} bad={bad}
                neutral={neutral} clicks={clicks}></Statistics>
        </>
    )
}

ReactDOM.render(
    <App />,document.getElementById('root')
);

