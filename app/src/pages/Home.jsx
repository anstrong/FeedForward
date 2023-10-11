import DirectReportList from "../components/DirectReportList";
import EntryList from "../components/EntryList";
import EntryInput from "../components/EntryInput";

export default function Home () {
    return (<>
        <h1>Home</h1>
        <EntryInput />
        <EntryList />
        <DirectReportList  />
    </>);
};
