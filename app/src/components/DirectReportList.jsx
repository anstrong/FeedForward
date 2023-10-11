import DirectReport from "./DirectReport";

export default function DirectReportList({ reports }) {
    return (<div>
        <h2>My Reports</h2>
        <ul>
        {reports.map(report => <DirectReport name={report} key={report}/>)}
    </ul></div>
    );
};
