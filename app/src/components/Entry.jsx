export default function Entry(params) {
    const truncate = 75;

    return <div className="entry">
        <div class='sender'>
            <h3>{params.sender}</h3>
        </div>
        <div>
            <p>{params.body.length > truncate? params.body.slice(0, 75) + '...' : params.body}</p>
        </div>
    </div>;
};
