import React, { useState } from "react";

function SignIn({ onSuccessfulAuth }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const uid = authenticate(username, password);
        if (!uid) {
            alert("Credentials are not valid");
            setUsername("");
            setPassword("");
        } else {
            onSuccessfulAuth(uid)
        }
    }

    function authenticate(username, password) {
        return '123456789'
        /*fetch('localhost:3000/login', {
            method: "POST",
            body: { username: username, password: password }
        }).then(response => console.log(response))*/
    }

    return (
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
    );
}

export default SignIn;
