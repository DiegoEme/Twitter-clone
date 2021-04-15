import React, { useState, useEffect } from "react";

import { dbService, storageService } from "myBase";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";

const Home = ({userObject}) => {
  
  const [tweets, setTweets] = useState([]);
  

 /*  const getTweets = async () => {
    const dbTweets = await dbService.collection("tweets").get();
    dbTweets.forEach((doc) => {
      const tweetObject = {
        ...doc.data(),
        id: doc.id,
        
      }
      setTweets((prev) => {
        return [tweetObject, ...prev]
      })
    })
  }; */

  useEffect(() => {
   // getTweets(); Not used beacause snapshot is used
    //event listener that gets triggered when the db is changed
    //Realtime tweets
    dbService.collection("tweets").onSnapshot((snapshot) => {
      const tweetsArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setTweets(tweetsArray);
    })
  }, []);

 

  return (
    <div className="container">
     <TweetFactory userObject={userObject}/>
      <div style={{ marginTop: 30 }}>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} isOwner={tweet.data.creatorId === userObject.uid} tweetObject={tweet}/>
        ))}
      </div>
    </div>
  );
};

export default Home;
