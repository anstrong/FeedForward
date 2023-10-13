import { useEffect, useState } from "react";

export default function EntryInput({ clickedRecipient, submit }) {
    const [entry, setEntry] = useState("");
    const [recipient, setRecipient] = useState("");

    useEffect(() => {
        setEntry("");
        setRecipient(clickedRecipient);
    }, [clickedRecipient]);

    const handleEntryChange = (event) => {
        event.preventDefault();
        setEntry(event.target.value);
    }

    const handleRecipientChange = (event) => {
        event.preventDefault();
        setRecipient(event.target.value);
    }

    const handleSubmit = (event) => {
        submit(event);
        setEntry("");
        setRecipient("");
    }

    return (
        <>
        <h2>Submit Feedback</h2>
        <form onSubmit={handleSubmit} className = "textalignleft">
            <textarea value={entry} onChange={handleEntryChange} name="entryBody" />
                <br />
                <footer>
            <input className="header-left text" placeholder="Recipient" value={recipient} onChange={handleRecipientChange} name="recipient" />
                    <button disabled={entry === "" || recipient === ""} className="btn-primary header-right" type="submit" title="Submit">
                        <b className="dark-char">{">"}</b>
                        <b className="med-char">{">"}</b>
                        <b className="light-char">{">"}</b>
                    </button>
                </footer>
            </form>
    </>);
};
