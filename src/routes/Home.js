import React, { useState, useEffect } from "react";
import { dbService } from "myBase";

const Home = ({userObject}) => {
  
  const [tweet, setTweet] = useState("");
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

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("tweets").add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObject.uid
    });
    setTweet("");
  };

  const onChange = (event) => {
    let value = event.target.value;
    setTweet(value);
  };

  console.log(tweets)
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="Whats on your mind"
          maxLength={140}
        />
        <input type="submit" valur="Tweet" />
      </form>
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id}>
            <h4>{tweet.data.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
