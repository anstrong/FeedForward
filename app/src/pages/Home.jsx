import React, { useEffect, useState } from "react";

import DirectReportList from "../components/DirectReportList";
import EntryList from "../components/EntryList";
import EntryInput from "../components/EntryInput";

const dummy_entries = [
    {
        "_id": {
            "$oid": "6526b53ec7544da5b3f25ad1"
        },
        "body": "you're a meanie",
        "sender": "user1",
        "recipient": "user3",
        "valence": 0
    },
    {
        "_id": {
            "$oid": "6526b53ec7544da5b3f25ad1"
        },
        "body": "thanks for lunch!",
        "sender": "user1",
        "recipient": "user3",
        "valence": 0
    }
];
const dummy_reports = ["Jane Doe", "John Doe"];
export default function Home({ user }) {
    const [entries, setEntries] = useState([]);
    const [reports, setReports] = useState([]);
    const [toSubmit, setToSubmit] = useState("");

    useEffect(() => {
        console.log('rerendering');
        function sendPost(body) {
            console.log(body);
            fetch('http://localhost:8000/send/', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ body: body, sender: user, recipient: user, valence: 1 })
            }).then(response => {
                console.log(response);
            }).then(response => {
                setToSubmit("");
            }).catch(e => console.log(e))
        }
        function sendQuery(path, callback = (result) => (console.log(result))){
            fetch(`http://localhost:8000/${path}`)
                .then(response => {
                    console.log(response);
                    return response.json();
                }).then(payload => {
                    console.log(payload);
                    callback(payload);
                }).catch(e => console.log(e));
        }
        if (toSubmit) {
            sendPost(toSubmit)
            return () => {
                setToSubmit("");
            }
        } else {
            sendQuery(`users/${user}/entries`, (result) => setEntries(result));
            sendQuery(`users/${user}`, (result => setReports(result['direct_reports'])));
        }
    }, [ user, toSubmit ]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setToSubmit(event.target.entryBody.value);
    }

    return (<>
        <h1>Home</h1>
        <h2>Hi, {user}!</h2>
        <EntryInput text={toSubmit} update={() => {}} submit={handleSubmit}/>
        <EntryList entries={entries}/>
        <DirectReportList  reports={reports}/>
    </>);
};



/*
return (<>
        <h1>Home</h1>
        <h2>Hi, {user}!</h2>
        <EntryInput text={toSubmit} update={() => {}} submit={handleSubmit}/>
        <EntryList entries={entries}/>
        <DirectReportList  reports={reports}/>
    </>);
    
*/
