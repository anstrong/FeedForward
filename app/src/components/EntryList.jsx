import Entry from "./Entry";

export default function EntryList({ entries }) {
    return (<div>
        <header>
            <h2 className="header-left">My Feedback</h2>
            <h3 className="header-right">{entries.length} new messages</h3>
        </header>
        <ul>
            {entries.map(entry => <Entry className="entry" {...{ ...entry, key: JSON.stringify(entry.body) }} />)}
    </ul></div>
    );
};
