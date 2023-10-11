import DirectReport from "./DirectReport";

const reports = ["Jane Doe", "John Doe"]
export default function DirectReportList() {
    return (<div>
        <h2>My Reports</h2>
        <ul>
        {reports.map(report => <DirectReport name={report} />)}
    </ul></div>
    );
};
