import DirectReportList from "../components/DirectReportList";
import EntryList from "../components/EntryList";
import EntryInput from "../components/EntryInput";

export default function Home({ user }) {
    return (<>
        <h1>Home</h1>
        <h2>Hi, user {user}!</h2>
        <EntryInput />
        <EntryList />
        <DirectReportList  />
    </>);
};
