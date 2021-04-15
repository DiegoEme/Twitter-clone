import React, {useEffect} from 'react';
import authService, { dbService } from 'myBase';
import {useHistory} from 'react-router-dom'

function Profile({userObject}) {
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

    return (
        <div>
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    )
}

export default Profile
