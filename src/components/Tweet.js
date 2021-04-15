import React from "react";
import { dbService, storageService } from "myBase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    
      <div className="nweet">
      {editing ? (
          <>
        {isOwner && (
        <>
        <form onSubmit={onSubmit} className="container nweetEdit">
          <input 
          autoFocus
          className="formInput"
          onChange={onChange}
          type="text" 
          placeholder="Edit Tweet" 
          value={newTweet} 
          required />
          <input className="formBtn" type="submit" value="Update"/>
        </form>
        <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
        </span>
        </>)}
        </>
      ) : (
        <>
          <h4>{tweetObject.data.text}</h4>
          {tweetObject.data.picUrl && <img width="50px" src={tweetObject.data.picUrl}/>}
          {isOwner && (
             <div class="nweet__actions">
             <span onClick={onDeleteClick}>
               <FontAwesomeIcon icon={faTrash} />
             </span>
             <span onClick={toggleEditing}>
               <FontAwesomeIcon icon={faPencilAlt} />
             </span>
           </div>
          )}
        </>
      )}
    </div>
  );
}

export default Tweet;
