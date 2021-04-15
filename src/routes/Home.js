import React, { useState, useEffect } from "react";
import {v4 as uuidv4} from 'uuid'
import { dbService, storageService } from "myBase";
import Tweet from "components/Tweet";

const Home = ({userObject}) => {
  
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [pic, setPic] = useState();

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
    let picUrl = "";

    if(pic !== ""){
      const fileRef = storageService
      .ref()
      .child(`${userObject.uid}/${uuidv4()}`)
      const response = await fileRef.putString(pic, "data_url");
      picUrl = await response.ref.getDownloadURL();
    }
 
    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObject.uid,
      picUrl
    }

    await dbService.collection("tweets").add(tweetObj);
    setTweet("");
    setPic("");
  };

  const onChange = (event) => {
    let value = event.target.value;
    setTweet(value);
  };

  console.log(tweets)

  const onFileChange = (e) => {
    let files = e.target.files
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishEvent) => {
      //console.log(finishEvent);
      setPic(finishEvent.target.result)
    }
    reader.readAsDataURL(theFile);


  }

  const onClearPic = () => setPic(null);

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
        <input type="file" accept="image/*" onChange={onFileChange}/> 
        <input type="submit" value="Tweet" />
        {pic && (
          <div>
            <img src={pic} width="50px"  height="50px"/>
            <button onClick={onClearPic}>Clear </button>
          </div>        
        )}
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} isOwner={tweet.data.creatorId === userObject.uid} tweetObject={tweet}/>
        ))}
      </div>
    </div>
  );
};

export default Home;
