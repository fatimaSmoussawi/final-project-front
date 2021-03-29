import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import VideoCard from "../components/VideoCard";
// import Skeleton from "../skeletons/HomeSkeleton";
import VideoGrid from "../styles/VideoGrid";
// import { getRecommendation } from "../reducers/recommendation";

export const StyledHome = styled.div`
  padding: 1.3rem;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 7rem;

  h2 {
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 1093px) {
    width: 95%;
  }

  @media screen and (max-width: 1090px) {
    width: 99%;
  }

  @media screen and (max-width: 870px) {
    width: 90%;
  }

  @media screen and (max-width: 670px) {
    width: 99%;
  }

  @media screen and (max-width: 600px) {
    width: 90%;
  }

  @media screen and (max-width: 530px) {
    width: 100%;
  }
`;

const Home = () => {
//   const dispatch = useDispatch();
//   const { isFetching, videos } = useSelector((state) => state.recommendation);

//   useEffect(() => {
//     dispatch(getRecommendation());
//   }, [dispatch]);

//   if (isFetching) {
//     return <Skeleton title={true} />;
//   }
const [getData, setGetData] = useState([]);
const [render, setRender] = useState(false);

useEffect(() => {
  try {
    Axios.get("http://localhost:8000/api/video").then((response) => {
      setGetData(response.data.video);
      console.log(response.data.video);
    });
  } catch (error) {
    console.log(error);
  }
}, [render]);


  return (
    <div>
     <StyledHome>
      <h2>Recommended</h2>

      <VideoGrid>

      {getData.map((video) => {
				return (
					 <Link key={video.id} to={`/watch/${video.id}`}>

						{/* <p>{val.url}</p>
						<p>{val.start}</p>
						<p>{val.end}</p>
						<p>{val.newUrl}</p> */}
          <VideoCard video={video} />

				
           </Link>
      	);
			})}
      
            {/* {
            // !isFetching &&
            
              videos.map((video) => (
                // <Link key={video.id} to={`/watch/${video.id}`}>
                  <VideoCard video={video} />
                // </Link>
              )
              )} */}
      </VideoGrid>
    </StyledHome>
    </div>
  );
};

export default Home;
