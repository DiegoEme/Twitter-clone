import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { dbService, storageService } from "myBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const TweetFactory = ({ userObject }) => {
  const [tweet, setTweet] = useState("");
  const [pic, setPic] = useState("");

  const onSubmit = async (event) => {
    if (tweet === "") {
      return;
    }
    event.preventDefault();
    let picUrl = "";

    if (pic !== "") {
      const fileRef = storageService
        .ref()
        .child(`${userObject.uid}/${uuidv4()}`);
      const response = await fileRef.putString(pic, "data_url");
      picUrl = await response.ref.getDownloadURL();
    }

    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObject.uid,
      picUrl,
    };

    await dbService.collection("tweets").add(tweetObj);
    setTweet("");
    setPic("");
  };

  const onChange = (event) => {
    let value = event.target.value;
    setTweet(value);
  };

  const onFileChange = (e) => {
    let files = e.target.files;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishEvent) => {
      //console.log(finishEvent);
      setPic(finishEvent.target.result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearPic = () => setPic("");
  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={tweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />

      {pic && (
        <div className="factoryForm__attachment">
          <img
            src={pic}
            style={{
              backgroundImage: pic,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearPic}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default TweetFactory;
