import { useEffect, useState } from "react";

export default function EntryInput({ text, update, submit }) {
    const [entry, setEntry] = useState("");

    useEffect(() => {
        setEntry("");
    }, []);

    const handleChange = (event) => {
        event.preventDefault();
        setEntry(event.target.value);
    }

    const handleSubmit = (event) => {
        submit(event);
        setEntry("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input  value={entry} onChange={handleChange} name="entryBody" />
            <br />
            <input type="submit" value="Submit" />
    </form>);
};
