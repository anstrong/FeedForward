import Entry from "./Entry";

export default function EntryList({ entries }) {
    return (<div>
        <h2>My Feedback</h2>
        <ul>
            {entries.map(entry => <Entry {...entry} />)}
    </ul></div>
    );
};
