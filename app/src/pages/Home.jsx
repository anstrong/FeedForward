import React, { useEffect, useState } from "react";

import DirectReportList from "../components/DirectReportList";
import EntryList from "../components/EntryList";
import EntryInput from "../components/EntryInput";

export default function Home({ user }) {
    const [entries, setEntries] = useState([]);
    const [reports, setReports] = useState([]);
    const [isManager, setIsManager] = useState(false);
    const [toSubmit, setToSubmit] = useState("");

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
        if (toSubmit && !toSubmit.includes("")) {
            sendPost(toSubmit)
            return () => {
                setToSubmit("");
            }
        } else {
            sendQuery(`users/${user}/entries`, (result) => setEntries(result));
            sendQuery(`users/${user}`, (result => {
                setReports(result['direct_reports']);
                setIsManager(result['is_manager']);
            }));
        }
    }, [ user, toSubmit ]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setToSubmit([event.target.entryBody.value, event.target.recipient.value]);
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
        <span><section>
            <EntryInput submit={handleSubmit} />
        </section></span>
        <span><section><EntryList entries={entries}/></section></span>
        {isManager? <span><section><DirectReportList reports={reports} /></section></span> : <></>}
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
