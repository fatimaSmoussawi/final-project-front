import React, { useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";
// import videojs from "video.js";
// import { client } from "../utils";
// import "video.js/dist/video-js.css";

const Player = ({ previewUrl , newUrl }) => {
//     const { videoId } = useParams();
// console.log(videoId);


//   const videoRef = useRef(null);

//   const dispatch = useDispatch();
//   const { id: videoId, url: src, thumb: poster } = useSelector(
//     (state) => state.video.data
//   );

//   useEffect(() => {
//     const vjsPlayer = videojs(videoRef.current);

//     if (!previewUrl) {
//       vjsPlayer.poster(poster);
//       vjsPlayer.src(src);
//     }

//     if (previewUrl) {
//       vjsPlayer.src({ type: "video/mp4", src: previewUrl });
//     }

//     vjsPlayer.on("ended", () => {
//       client(`${process.env.REACT_APP_BE}/videos/${videoId}/view`);
//     });

//     return () => {
//       if (vjsPlayer) {
//         vjsPlayer.dispose();
//       }
//     };
//   }, [videoId, dispatch, src, previewUrl, poster]);

  return (
    <div data-vjs-player>
      {/* <video
        controls
        // ref={videoRef}
        className="video-js vjs-fluid vjs-big-play-centered"
      ></video> */}
      		            <iframe
							id="player"
							type="text/html"
							width="640"
							height="390"
							src={newUrl}
							frameBorder="0"
                            // className="video-js vjs-fluid vjs-big-play-centered"

						></iframe> 
    </div>
  );
};

export default Player;
