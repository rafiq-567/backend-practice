import React, { use } from 'react';
import { useState } from 'react';

const Users = ({ usersPromise }) => {
    const initialusers = use(usersPromise)
    const [users, setUser] = useState(initialusers)
    console.log(users)

    const handleAddUser = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const user = { name, email }
        console.log(user)

        // create user in the server
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log('data after post', data)
                const newUsers = [...users, data]
                setUser(newUsers)
                e.target.reset()
            })


    }
    const handleDeleteUser = (id) => {
        console.log('delete this user',id)
    }

    return (
        <div>
            <form onSubmit={handleAddUser}>
                <input name='name' type="text" />
                <br />
                <input name='email' type="email" />
                <br />
                <input type="submit" value="Add User" />
            </form>
            <div>
                {
                    users.map(user => <p key={user.id}>{user.name} : {user.email}
                        <button onClick={() => handleDeleteUser(user.id)}>X</button></p>)
                }
            </div>
        </div>

    );
};

export default Users;