import React from "react";
import {v4 as uuidv4} from 'uuid'
import {useState} from "react";
import {dbService, storageService} from "myBase";


const TweetFactory = ({userObject}) => {
    const [tweet, setTweet] = useState("");
    const [pic, setPic] = useState("");

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
    )
}

export default TweetFactory;