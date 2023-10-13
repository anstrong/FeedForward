import React, { useEffect, useState } from "react";

import DirectReportList from "../components/DirectReportList";
import EntryList from "../components/EntryList";
import EntryInput from "../components/EntryInput";

export default function Home({ user }) {
    const [entries, setEntries] = useState([]);
    const [reports, setReports] = useState([]);
    const [isManager, setIsManager] = useState(false);
    const [toSubmit, setToSubmit] = useState("");
    const [recipient, setRecipient] = useState("");

    const [stats, setStats] = useState([]);

    useEffect(() => {
        console.log('rerendering');
        function sendPost([body, recipient]) {
            console.log(body);
            fetch('http://localhost:8000/send/', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ body: body, sender: user, recipient: recipient, valence: 0 })
            }).then(response => {
                console.log(response);
            }).then(response => {
                setToSubmit("");
                setRecipient("");
            }).catch(e => console.log(e))
        }
        function sendQuery(path, callback = (result) => (console.log(result))) {
            fetch(`http://localhost:8000/${path}`)
                .then(response => {
                    console.log(response);
                    return response.json();
                }).then(payload => {
                    console.log(payload);
                    callback(payload);
                }).catch(e => console.log(e));
        }
        if (toSubmit && !toSubmit.includes("")) {
            sendPost(toSubmit)
            return () => {
                setToSubmit("");
            }
        } else {
            sendQuery(`users/${user}/entries`, (result) => {
                setEntries(result);

                const valences = result.map(v => v.valence);
                console.log(valences);
                const getSum = (list, fn) => (list.reduce((acc, val) => acc + fn(val), 0));
                const getCount = (list, fn) => (list.filter(val => fn(val)).length);
                const getAverage = (vals) => { return getSum(vals, (val) => val ) / vals.length};
                const getPercent = (vals, condition) => { return 100*getCount(vals, condition)/vals.length + '%' };

                const average_valence = getAverage(valences);
                const positive_percent = getPercent(valences, (val) => val > 3);
                setStats([
                    ["average feedback sentiment", average_valence],
                    ["positive feedback", positive_percent]
                ]);
            });
            sendQuery(`users/${user}`, (result => {
                setReports([...result['direct_reports']]);
                setIsManager(result['is_manager']);
            }));
        }
    }, [user, toSubmit, recipient ]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setToSubmit([event.target.entryBody.value, event.target.recipient.value]);
    }

    const handleClick = (value) => {
        //event.preventDefault();
        console.log(value);
        setRecipient(value);
        console.log(recipient)
    }

    const Statistic = ({ stat, tag }) => {
        return (
            <div className="stat">
                <h1>{stat}</h1>
                <h3>{tag}</h3>
            </div>
        );
    }

    const Statistics = ({ stat_list }) => {
        console.log(stat_list);
        return (
            <center>
                <div className="stats">
                    {stat_list.map((item) => item[1]? <Statistic tag={item[0]} stat={item[1]}/>: <></>)}
                </div>
            </center>
        )
    }

    return (<>
        <header>
            <h1 className="header-left">FeedForward</h1>
            <h1 className="header-left arrow dark-char">{">"}</h1>
            <h1 className="header-left arrow med-char">{">"}</h1>
            <h1 className="header-left arrow light-char">{">"}</h1>
            {/*<h1 className="header-left arrow white-char">{">"}</h1>*/}
            <h2 className="header-right">Hi, {user}!</h2>
        </header>
        <Statistics stat_list={stats}  />
        <span><section><EntryList onClick={handleClick}entries={entries}/></section></span>
        {isManager ? <span><section><DirectReportList onClick={handleClick} reports={reports} /></section></span> : <></>}
        <span><section>
            <EntryInput clickedRecipient={recipient} submit={handleSubmit} />
        </section></span>
    </>);
};
