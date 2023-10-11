import Entry from "./Entry";

const entries = ["you're a meanie", "thanks for lunch!"]
export default function EntryList() {
    return (<div>
        <h2>My Feedback</h2>
        <ul>
        {entries.map(entry => <Entry body={entry} />)}
    </ul></div>
    );
};
