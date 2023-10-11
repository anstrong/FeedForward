import React, { useCallback, useEffect, useState } from "react";

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
    const [entries, setEntries] = useState(dummy_entries);
    const [reports, setReports] = useState(dummy_reports);
    const [toSubmit, setToSubmit] = useState("");

    /*const submitEntry = useCallback((text) => {
        console.log(text);
        setEntry("");
    });*/

    useEffect(() => {
        console.log(toSubmit);

        fetch('http://localhost:8080/send/', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ body: toSubmit, sender: user, recipient: user, valence: 1 })
        }).then(response => {
            console.log(response);
        }).catch(e => console.log(e));

        return () => {
            setToSubmit("");
        }
    }, [ user, toSubmit ]);

    useEffect(() => {
        function sendQuery(path, callback = (result) => (console.log(result))){
            fetch(`http://localhost:8080/${path}`)
                .then(response => {
                    console.log(response);
                    return response.json();
                }).then(payload => {
                    console.log(payload);
                    callback(payload);
                }).catch(e => console.log(e));
        }
        sendQuery(`users/${user}/entries`, (result) => setEntries(result));
        sendQuery(`users/${user}`, (result => setReports(result['direct_reports'])));
    }, [ user ]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setToSubmit(event.target.entryBody.value);
    }

    return (<>
        <h1>Home</h1>
        <h2>Hi, user {user}!</h2>
        <EntryInput text={""} update={() => {}} submit={handleSubmit}/>
        <EntryList entries={entries}/>
        <DirectReportList  reports={reports}/>
    </>);
};
