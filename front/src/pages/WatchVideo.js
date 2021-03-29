import React, { useState, useEffect } from 'react'
import Axios from 'axios';
// import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { Link, useParams } from "react-router-dom";

// UI elements
import Player from "../components/Player";
// import Comments from "../components/Comments";
import VideoCard from "../components/VideoCard";
import NoResults from "../components/NoResults";
import { LikeIcon, DislikeIcon } from "../components/Icons";
import Skeleton from "../skeletons/WatchVideoSkeleton";
import Button from "../styles/Button";

// reducers and others
// import {
//   subscribeFromVideo,
//   unsubscribeFromVideo,
//   clearVideo,
//   getVideo,
//   like,
//   dislike,
//   cancelLike,
//   cancelDislike,
// } from "../reducers/video";
// import { addChannel, removeChannel } from "../reducers/user";
// import { getRecommendation } from "../reducers/recommendation";
// import {
//   addChannelLocalSt,
//   removeChannelLocalSt,
//   client,
//   timeSince,
// } from "../utils";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 70% 1fr;
  grid-gap: 2rem;
  padding: 1.3rem;
  padding-bottom: 7rem;

  .video-container .video-info {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .video-info span {
    color: ${(props) => props.theme.secondaryColor};
  }

  .channel-info-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .video-info-stats {
    display: flex;
    align-items: center;
  }

  .video-info-stats div {
    margin-left: 6rem;
    position: relative;
    top: -2px;
  }

  .channel-info-flex button {
    font-size: 0.9rem;
  }

  .channel-info-description {
    padding-top: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
    border-top: 1px solid ${(props) => props.theme.darkGrey};
  }

  .channel-info-description p {
    font-size: 0.9rem;
    padding: 1rem 0;
  }

  .related-videos img {
    height: 140px;
  }

  .related-videos div {
    margin-bottom: 1rem;
  }

  svg {
    fill: ${(props) => props.theme.darkGrey};
  }

  ${(props) =>
    props.filledLike &&
    css`
      .like svg {
        fill: ${(props) => props.theme.blue};
      }
    `}

  ${(props) =>
    props.filledDislike &&
    css`
      .dislike svg {
        fill: ${(props) => props.theme.blue};
      }
    `}

	@media screen and (max-width: 930px) {
    grid-template-columns: 90%;
    .related-videos {
      display: none;
    }
  }

  @media screen and (max-width: 930px) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 425px) {
    .video-info-stats div {
      margin-left: 1rem;
    }
  }
`;

const WatchVideo = () => {
const { videoId } = useParams();
console.log(videoId);
const [getData, setGetData] = useState([]);
const [title, setTitle] = useState('');
const [avatar, setAvatar] = useState('');
const [description, setDescription] = useState('');

const [newUrl, setNewUrl] = useState([]);

const [render, setRender] = useState(false);
useEffect(() => {
  const id = localStorage.getItem("id");

  try {
    Axios.get(`http://localhost:8000/api/video/${videoId}`).then((response) => {
      // setGetData(response.data.user);
      setGetData(response.data.video);
      setTitle(response.data.video.title);
      setDescription(response.data.video.description);
      setAvatar(response.data.video.user.avatar);
      setNewUrl(response.data.video.newUrl);


      console.log(response.data.video.user);
    });
  } catch (error) {
    console.log(error);
  }
}, [render]);


// useEffect(() => {
//   try {
//     Axios.get("http://localhost:8000/api/video").then((response) => {
//       setGetDataVideo(response.data.video);
//       console.log(response.data.video);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }, [render]);

  // const dispatch = useDispatch();

  // const { isFetching: videoFetching, data: video } = useSelector(
  //   (state) => state.video
  // );
  // const { isFetching: recommendationFetching, videos: next } = useSelector(
  //   (state) => state.recommendation
  // );

  // const handleLike = () => {
  //   if (video.isLiked) {
  //     dispatch(cancelLike());
  //   } else {
  //     dispatch(like());
  //   }

  //   if (video.isDisliked) {
  //     dispatch(cancelDislike());
  //   }

  //   client(`${process.env.REACT_APP_BE}/videos/${videoId}/like`);
  // };

  // const handleDislike = () => {
  //   if (video.isDisliked) {
  //     dispatch(cancelDislike());
  //   } else {
  //     dispatch(dislike());
  //   }

  //   if (video.isLiked) {
  //     dispatch(cancelLike());
  //   }

  //   client(`${process.env.REACT_APP_BE}/videos/${videoId}/dislike`);
  // };

  // const handleSubscribe = (channel) => {
  //   dispatch(subscribeFromVideo());
  //   dispatch(addChannel(channel));
  //   addChannelLocalSt(channel);
  //   client(`${process.env.REACT_APP_BE}/users/${channel.id}/togglesubscribe`);
  // };

  // const handleUnsubscribe = (channelId) => {
  //   dispatch(unsubscribeFromVideo());
  //   dispatch(removeChannel(channelId));
  //   removeChannelLocalSt(channelId);
  //   client(`${process.env.REACT_APP_BE}/users/${channelId}/togglesubscribe`);
  // };

  // useEffect(() => {
  //   dispatch(getVideo(videoId));
  //   dispatch(getRecommendation());

  //   return () => {
  //     dispatch(clearVideo());
  //   };
  // }, [dispatch, videoId]);

  // if (videoFetching || recommendationFetching) {
  //   return <Skeleton />;
  // }

  // if (!videoFetching && !video) {
  //   return (
  //     <NoResults
  //       title="Page not found"
  //       text="The page you are looking for is not found or it may have been removed"
  //     />
  //   );
  // }

  return (
    <Wrapper
      // filledLike={video && video.isLiked}
      // filledDislike={video && video.isDisliked}
    >
      <div className="video-container">
        <div className="video">
          {/* {!videoFetching &&  */}
          {/* {getDataVideo.map((video) => {
				return (

					
          <Player video={video} />

				
      	);
			})}
       */}
          < Player newUrl={newUrl} />
          {/* } */}
          </div>

        <div className="video-info">
          <h3>
            {title}
            </h3>

          <div className="video-info-stats">
            <p>
              <span>
                {/* {video.views} views</span> <span>•</span>{" "} */}
              {/* <span>{timeSince(video.createdAt)} ago */}
              </span>
            </p>

            <div className="likes-dislikes flex-row">
              <p className="flex-row like">
                {/* <LikeIcon onClick={handleLike} />{" "} */}
                {/* <span>{video.likesCount}</span> */}
              </p>
              <p className="flex-row dislike" style={{ marginLeft: "1rem" }}>
                {/* <DislikeIcon onClick={handleDislike} />{" "} */}
                {/* <span>{video.dislikesCount}</span> */}
              </p>
            </div>
          </div>
        </div>

        <div className="channel-info-description">
          <div className="channel-info-flex">
            <div className="channel-info flex-row">
              <img
                className="avatar md"
               src={avatar==null ? "data:image/png;base64,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": "http://localhost:8000/storage/" + avatar}
                alt="channel avatar"
              />
              <div className="channel-info-meta">
                <h4>
                  {/* <Link to={`/channel/${video.userId}`}>
                    {video.User?.username}
                  </Link> */}
                </h4>
                <span className="secondary small">
                  {/* {video.subscribersCount} subscribers */}
                </span>
              </div>
            </div>
            {/* {!video.isVideoMine && !video.isSubscribed && (
              <Button onClick={() => handleSubscribe({ ...video.User })}>
                Subscribe
              </Button>
            )} */}
            {/* {!video.isVideoMine && video.isSubscribed && (
              <Button grey onClick={() => handleUnsubscribe(video.User.id)}>
                Subscribed
              </Button>
            )} */}
          </div>

          <p>{description}</p>
        </div>
        {/* <Comments /> */}
      </div>
{/* 
      <div className="related-videos">
        <h3 style={{ marginBottom: "1rem" }}>Up Next</h3>
        {next
          .filter((vid) => vid.id !== video.id)
          .slice(0, 3)
          .map((video) => (
            <Link key={video.id} to={`/watch/${video.id}`}>
              <VideoCard key={video.id} hideavatar={true} video={video} />
            </Link>
          ))}
      </div> */}
    </Wrapper>
  );
};

export default WatchVideo;
