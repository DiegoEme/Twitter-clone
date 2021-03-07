import React, { useState } from "react";
import { dbService } from "myBase";

const Home = () => {
  const [tweet, setTweet] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("tweets").add({
      tweet,
      createdAt: Date.now()
    });
    setTweet("");
  };

  const onChange = (event) => {
    let value = event.target.value;
    setTweet(value);
  };

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
    </div>
  );
};

export default Home;
