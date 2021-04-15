import React from "react";
import { dbService, storageService } from "myBase";
import { useState } from "react";

function Tweet({ tweetObject, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObject.text);

  const onDeleteClick = async () => {
    const confirm = window.confirm("Are you sure you wanna delete the tweet?");
    if (confirm) {
      await dbService.doc(`tweets/${tweetObject.id}`).delete();
      await storageService.refFromURL(tweetObject.picUrl).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObject.id}`).update({
        text: newTweet
    })
    setEditing(false)
  }

  const onChange = (event) => {
    const newText = event.target.value;
    setNewTweet(newText);
  }

  return (
    <div>
      {editing ? (
          <>
        {isOwner && (<><form onSubmit={onSubmit}>
          <input 
          onChange={onChange}
          type="text" 
          placeholder="Edit Tweet" 
          value={newTweet} 
          required />
          <input type="submit" value="Update"/>
        </form>
        <button onClick={toggleEditing}>Cancel</button></>)}
        </>
      ) : (
        <>
          <h4>{tweetObject.data.text}</h4>
          {tweetObject.data.picUrl && <img width="50px" src={tweetObject.data.picUrl}/>}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Tweet;
