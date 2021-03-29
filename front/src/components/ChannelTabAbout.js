import React, { useState, useEffect } from "react";

const ChannelTabAbout = () => {
    const [about, setAbout] = useState('');

    useEffect(() => {
        setAbout(localStorage.getItem('channelDescription'))
   },[])
   //  console.log(token)

  return <p>{about=='null'  ? "No description for this channel": about}</p>;
};

export default ChannelTabAbout;
