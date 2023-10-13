import DirectReport from "./DirectReport";

export default function DirectReportList({ onClick, reports }) {
    return (<div >
        <header>
            <h2 className="header-left">My Team</h2>
            <h3 className="header-right">{reports.length} direct reports</h3>
        </header>
        <ul className='flex'>
        {reports.map(report => <DirectReport onClick={onClick} name={report} key={report}/>)}
    </ul></div>
    );
};
