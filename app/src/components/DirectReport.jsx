export default function DirectReport(params) {
    return <div onClick={(e) => params.onClick(params.name)} className="person">
        <h3>{params.name}</h3>
    </div>
};
