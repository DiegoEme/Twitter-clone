import React, {useEffect, useState} from 'react';
import authService, { dbService } from 'myBase';
import {useHistory} from 'react-router-dom'

function Profile({refreshUser, userObject}) {
    const [newDisplayName, setNewDisplayName] = useState(userObject.displayName);
    
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
        
    }

    const getMyTweets = async () => {
        const tweets = await dbService
        .collection("tweets")
        .where("creatorId", "==", userObject.uid)
        .get();
        console.log(tweets.docs.map(doc => doc.data()));
    }

    useEffect(() => {
        getMyTweets()
    }, [])


    const onChange = (event) => {
        const value = event.target.value;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObject.displayName !== newDisplayName){
           await userObject.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    }

    return (
        <div>
            <form onSubmit = {onSubmit}>
                <input 
                    onChange={onChange}
                    value={newDisplayName}
                    type="text" 
                    placeholder="display name"
                />
                <input type="submit" value="Update profile"/>
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    )
}

export default Profile
