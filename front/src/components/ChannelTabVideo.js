import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import styled from "styled-components";
import { Link } from "react-router-dom";
import VideoCard from "./VideoCard";

const Wrapper = styled.div`
  .videos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
  }

  @media screen and (max-width: 830px) {
    .videos {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 540px) {
    .videos {
      grid-template-columns: 1fr;
    }
  }
`;

const ChannelTabVideo = () => {
// const [videos, setVideos] = useState([]);
const [getData, setGetData] = useState([]);
const [render, setRender] = useState(false);

useEffect(() => {
  const id = localStorage.getItem("id");

  try {
    Axios.get(`http://localhost:8000/api/user/${id}`).then((response) => {
      // setGetData(response.data.user);
      setGetData(response.data.user.video);

      console.log(response.data.user.video);
    });
  } catch (error) {
    console.log(error);
  }
}, [render]);
  // const { videos } = useSelector((state) => state.profile.data);

  if (!getData?.length) {
    return <p>This channel hasn't posted any videos yet</p>;
  }

  return (
    <Wrapper>
      <div className="videos">
        {getData.map((video) => (
          
          <Link 
          to={`/watch/${video.id}`} key={video.id}
          >
            <VideoCard 
            nousername={true} hideavatar={true} 
            video={video}
             />
          </Link>
        ))}

      </div>
    </Wrapper>
  );
};

export default ChannelTabVideo;
