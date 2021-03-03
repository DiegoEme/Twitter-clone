import authService from 'myBase'
import React from 'react'

function Profile() {
    const onLogOutClick = () => authService.signOut();

    return (
        <div>
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    )
}

export default Profile
