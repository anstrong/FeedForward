import DirectReport from "./DirectReport";

export default function DirectReportList({ reports }) {
    return (<div>
        <header>
            <h2 className="header-left">My Team</h2>
            <h3 className="header-right">{reports.length} direct reports</h3>
        </header>
        <ul>
        {reports.map(report => <DirectReport name={report} key={report}/>)}
    </ul></div>
    );
};
