export default function DirectReport(params) {
    return <div onClick={params.onClick} className="person">
        <h3>{params.name}</h3>
    </div>
};
