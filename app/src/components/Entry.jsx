export default function Entry(params) {
    return <div className="entry" onClick={(e) => params.onClick(params.sender)}>
        <div class='sender'>
            <h3>{params.sender}</h3>
        </div>
        <div class="text">
            <p>{params.body}</p>
        </div>
    </div>;
};
