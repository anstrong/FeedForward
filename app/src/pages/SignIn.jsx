import React, { useState } from "react";

function SignIn({ onSuccessfulAuth }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        authenticate(username, password);
    }

    function handleFailure(e) {
        console.log(e)
        alert("Credentials are not valid");
        setUsername("");
        setPassword("");
    }

    function authenticate(username, password) {
        try {
            fetch('http://localhost:8000/login/', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password })
            }).then(response => {
                console.log(response);
                return response.json();
            }).then(payload => {
                console.log(payload);
                let uid = payload['username'];
                onSuccessfulAuth(uid);
            }).catch(e => handleFailure(e));
        } catch (e) {
            handleFailure(e)
        }
    }

    return (
        <>
        <header className="login">
            <h1 className="header-left">FeedForward</h1>
            <h1 className="header-left arrow dark-char">{">"}</h1>
            <h1 className="header-left arrow med-char">{">"}</h1>
            <h1 className="header-left arrow light-char">{">"}</h1>
        </header>
        <span className='login'>
        <section >
            <h1>Welcome back!</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    Username
                    <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    Password
                    <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                        </div>
                <button disabled={username === "" || password === ""} className="btn-primary header-right" type="submit" title="Submit">
                    <p className="label"> Sign In </p>
                    <b className="dark-char">{">"}</b>
                    <b className="med-char">{">"}</b>
                    <b className="light-char">{">"}</b>
                </button>
            </form>
            </section>
            </span>
    </>
    );
}

export default SignIn;


/*
return (
        <div>
            <h1 className="textalignleft">Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                Username:
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <br />
                <label>
                    Password:
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
            <br />
            <input type="submit" value="Submit" />
            </form>
        </div>
    );
*/
