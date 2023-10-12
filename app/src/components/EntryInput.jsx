import { useEffect, useState } from "react";

export default function EntryInput({ submit }) {
    const [entry, setEntry] = useState("");
    const [recipient, setRecipient] = useState("");

    useEffect(() => {
        setEntry("");
        setRecipient("");
    }, []);

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
            <input className="header-left" placeholder="Recipient" value={recipient} onChange={handleRecipientChange} name="recipient" />
            <br  />
                    <button disabled={entry === "" || recipient === ""} className="btn-primary header-right" type="submit">Submit</button>
                </footer>
            </form>
    </>);
};
