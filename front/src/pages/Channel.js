import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useParams } from "react-router-dom";
import Axios from 'axios';


// components
// import EditProfile from "../components/EditProfile";
import ChannelTabVideo from "../components/ChannelTabVideo";
import ChannelTabAbout from "../components/ChannelTabAbout";
import ChannelTabChannels from "../components/ChannelTabChannels";
// import NoResults from "../components/NoResults";
// import Button from "../styles/Button";
import Skeleton from "../skeletons/ChannelSkeleton";



const activeTabStyle = {
  borderBottom: "2px solid white",
  color: "white",
};

const Wrapper = styled.div`
  background: ${(props) => props.theme.black};
  min-height: 100vh;
  padding-bottom: 7rem;

  .cover {
    height: 170px;
  }

  .cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .header-tabs {
    padding: 1.2rem 1rem;
    background: ${(props) => props.theme.bg};
  }

  .header {
    width: 80%;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
  }

  .tabs,
  .tab {
    margin: 0 auto;
    margin-top: 1.5rem;
    width: 80%;
  }

  ul {
    list-style: none;
    display: flex;
    align-items: center;
  }

  li {
    margin-right: 2rem;
    text-transform: uppercase;
    letter-spacing: 1.1px;
  }

  li:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 860px) {
    .header,
    .tabs,
    .tab {
      width: 90%;
    }
  }

  @media screen and (max-width: 470px) {
    .header,
    .tabs {
      width: 100%;
    }
  }

  ${(props) =>
    props.editProfile &&
    css`
      @media screen and (max-width: 440px) {
        .header {
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
        }
      }
    `}
`;

const Channel = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [cover, setCover] = useState('');
  // const [channelDescription, setChannelDescription] = useState('');


//   useEffect(() => {
//    setAvatar(localStorage.getItem('avatar'))
//  },[])

//  const [cover, SetCover] = useState('');

//  useEffect(() => {
//   SetCover(localStorage.getItem('cover'))
// },[])

const [getVideos, setGetVideos] = useState([]);
const [getData, setGetData] = useState([]);
const [render, setRender] = useState(false);

// useEffect(() => {
//   setUserName(localStorage.getItem('userName'))
// },[])

useEffect(() => {
  const id = localStorage.getItem("id");

  try {
    Axios.get(`http://localhost:8000/api/user/${id}`).then((response) => {
      setAvatar(response.data.user.avatar);
      setCover(response.data.user.cover);

      console.log(response.data.user);
    });
  } catch (error) {
    console.log(error);
  }
}, [render]);

// useEffect(() => {
//     const id = localStorage.getItem("id");
//     setLoading(true);
//     if (id != null || !!id) {
//       Axios.get(`http://localhost:8000/api/user/${id}`).then((response) => {

//         // console.log(response.data.business.name);
//         setFirstName(response.data.user.firstName);
//         setLastName(response.data.user.lastName);
//         setUserName(response.data.user.userName);
//         setEmail(response.data.user.email);
//         setPassword(response.data.user.password);
//         setAvatar(response.data.user.avatar);
//         setCover(response.data.user.cover);
//         setChannelDescription(response.data.user.channelDescription)

//       });
//       setLoading(false);
//     }
//   }, [])
//   const { userId } = useParams();

//   const dispatch = useDispatch();
//   const { id: loggedInUserId } = useSelector((state) => state.user.data);
//   const { isFetching, data: profile } = useSelector((state) => state.profile);

   const [tab, setTab] = useState("VIDEOS");

//   const profileId = userId || loggedInUserId;

//   const handleSubscribe = (channel) => {
//     dispatch(subscribeFromProfile());
//     dispatch(addChannel(channel));
//     addChannelLocalSt(channel);
//     client(`${process.env.REACT_APP_BE}/users/${channel.id}/togglesubscribe`);
//   };

//   const handleUnsubscribe = (channelId) => {
//     dispatch(unsubscribeFromProfile());
//     dispatch(removeChannel(channelId));
//     removeChannelLocalSt(channelId);
//     client(`${process.env.REACT_APP_BE}/users/${channelId}/togglesubscribe`);
//   };

//   useEffect(() => {
//     dispatch(getProfile(profileId));

//     return () => {
//       dispatch(clearProfile());
//     };
//   }, [dispatch, profileId]);

//   if (!isFetching && !profile) {
//     return (
//       <NoResults
//         title="Page not found"
//         text="The page you are looking for is not found or it may have been removed"
//       />
//     );
//   }

//   if (isFetching) {
    // return <Skeleton />;
//   }

  return (
    <Wrapper
    //  editProfile={profile.isMe}
     >
      <div className="cover">
        <img 
            src={cover==null  ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxANDw0NDw0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDg0NDisZFRk3Ny03NzctLSstLTctKysrLSs3LS03KystLS0tKysrLS03KysrLSsrKystKysrKysrK//AABEIALcBEwMBIgACEQEDEQH/xAAYAAADAQEAAAAAAAAAAAAAAAAAAQIDBP/EACUQAQEAAgEDBQEBAAMAAAAAAAABAhESAyFREzFBYXGBoTKRsf/EABcBAQEBAQAAAAAAAAAAAAAAAAABBAP/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDqmVip1EE0OTWXYsniMYuUDuE8JvTigCPTnlNw+2hAz4jjTOZAnuW60lMGe75o5XystAnlRyquI4gXOjnfocRxAc79HzToArmOf0kArmOadHoFchcvqlIVAer9F6v0KmwFepfovUqdFsF875LlfNQAVypbJeOHkEbNvoACppA4BABzJW0DG+4KAAJySvJAAbIA0g7pwrQE7Azuoz2DQt/aAC+Rc0gD5LwnlOOKwVwg4FjVgjizuNbMt9wLhS41psgRxpcb4aFaDLiOK6IB44a+6pEVMgUBsAmkdIDAK0CtPBKsaC0002gdyRtNuzoGGZygtrjdsOSsc9AfUvf8SLSAxsgByqiBLoG0COR8gUeOXwz5DYN2K8ct/qAOUbAsArSFIAZQwEVIWKgALYAhCuU8jG79gO0j4HwBB4+58RYBZZIKUwAAAqAACcqaaorGnUw0D2EqgGQAKhpwUAqVpsAYrLDHsrQAxoAmzaGqOp58AQtZXO/iQa+pFb2wadPL4BYMgZU5dD4IHRhns6wXjnsF2ptFpUGdglHITuCiZ5+9LYNCRs+QLqU8hsFbG0xUA9jkm0oo02EhBcWx21xu4BgAFYVbJpjQAAAqnIyoMDPOdygHMdpq4q47BE6hlenQAxFGJ5RQpSyA0grHPynPLfYtFYAOUouzQM8i2u1NgFsQaVpQgCqAUchWgkyoUXskbVKBten7M19NBYFAA5QAWRQAEmQJ6k9kxeU7IA141EXjP8AwNkDLFoyagjR057nxBmVMqCYvl8JkEUKltVKRAo0tmk6FUJO1IyukFbUjFUA9FVBRGj0otgNKxy0kIN4EYX4WAMpTAAxQIjABnponKdwGM21s1Bhjr9GfsDMAAxaRmvH2ALxRPlcgIsTYunKDIKy0gFyT9TfclaBNB0gIsoez2ojSwaBDZZVIKEghqA4RwA0xu2Zzsg1BGB7VLEzGnMAKwHlOyQPYlmySDoTn7Msc9fi88prYJDO0AlWCTii+le/60yrGNLN90C2jK+OxlQZmeiUOHtIAWls4VAKmkhBViaABUhQoDlI5AUcTIqADMIHjdNcc5+MiB0hhjlY0x6vkF1k1l2jqT/QRU0/f2aYdPXv3/wDARhhb+K6mEk/rVOc7UHPoKAMzhGovS8Sx7npAWbZ5YtADLiWeOpL/ABpnBf8AjoGMOCRWgRU3+taQM9XwONaAGfGnxqgCeB8IYUGoAQGQhgIraQCwUpgCMIHOy+W+1/7+ULkBeNk+j2mQAsJTl1ZPsEgTqT5n+gGJgwX06tnhF5AJkuarM4C9DKTGfZTJOWWwTlErKwEUjSAACgByKmAIDSYRUiDKSq9NoAZ+mPTWAZ8KWmpgxDXX0OH0CDP0xwoDCbaIts9p/UXK0GtzkRer4ZnoBbaNGAAAAo0x6fkAGiaQAAgBggBjRABcdp9OgAc6X2qYAAriOIADiNQABqDUAAfw/wCEAMAAAAABAAAATcIVw+wATwAAEYAP/9k=": "http://localhost:8000/storage/" +cover}
         alt="channel-cover" />
      </div>

      <div className="header-tabs">
        <div className="header">
          <div className="flex-row">
            <img
              className="avatar lg"
               src={avatar==null ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXBx9D///+9w83Y3OHDydL19vfS1t3q7O/IzdXt7/HN0tnd4OXGy9Tl5+v4+frg4+dnyPTjAAAKUUlEQVR4nN2d28KjKgyFGUTF8/u/7dba/tWWQ0IWSve6mYuZqX5yTEiC+pdfc9cuQ9X01o7GKGNGa/umGpa2my94usr543M3VdboVcql7S+Mraa8oLkI53boNzI324lzI+2HNhdmDsJ5aoyn2QKg2jRTDko4YVdZNt2b0lYd+oWwhG2jkvFekKppoe8EJNzwRHRvSiQkirCuQHhPSFXVoDfDEE4WifeEtBPk3QCE8wBtvgOjGgCTq5iwbvLgPSEbcWcVEublgzCKCOs+Nx+AUUA4Z2+/N6NgPKYTVlfxPRirywmnC/F2pa4daYT1eGUD7tJj2nBMIry0gx4Yk7pqAmF3C96uBMuDT3jZDOpSQjNyCTtzI98mwx2NTMLhzgbcpYeMhHMGE4IvbVnrP4fwzinmLM6EwyAsoIe+pJcchJfssqnSPZxwHu+G+tBIHYxEwvpuIIeIywaNsC2ph76kafMNiXAqEXBFJJkbFMKlTEDilEogLBaQhhgnLGgZ/BZhCxclLBqQghgjLLiL7op21AhhobPoUbEZNUz4A4BRxCBh9wuAsaU/RFj/BqAKb+BChHe/N0NphPbu12bIphD26Ld4hJXswh84+u1FLyF2IdRbmMXSdnU913XXLlvABvYB3mXRR4icRrVqpu+5oJ5QkQ37Q3wTqodwBj668U/mHdK97DH6PYSoWUabmA03GRSkZ7ZxE4K223E+JKNnE+4kxAxCTT7ymzAD0j0UnYSQswndEPk2YcajoRI2iKcpXuBWC3mm66M6CBGONR3YZLg1IyY37fisDkLEk1JOayEnyxTCSv4YzrHCQYht1Pen/SIEmEw0P6ZDAINbf22evgjl5xPJgBDEMUYof0ZiF90l76hf3/eTUPoASfTSJsB0EyaUTzPsZeJD8kXj4xOfCWf4F+RL/Ab6bGSc30i8myGeeIUk3xSfdzYnQvlKIRuEu8Qj5bxinAjlrhkAIKCfnpw2x3cSN6FgJTxKvGKdGvFIKG5C6Tz6kng+PTbigVDehKhMF7F1c2zEA6F4Iv3aMCVLvHU8TKdvQvFaCBqFm+Qj8b0mvgkH4Y+CJtLna0n19kq9X6uItfAl+fb0mxA7RUsFXLj+CMUztNPRlSyxu+9v5XoRyj8aspMCuulfl1KwX8Qm8Ir3339f/EUo/L0vm0UqnB33/FPuI0Xt2F4SL/qvHdaTUO7m5vjwKYK90ZNQ3ick/ieXFvEb6SOhvJPCdt0vwV5pJ5R3CfBUCjnhaw6E4h/D7mg2IXzvb0LA9wIvFpDlYu9XD0KAG1aDARGT377oPwgBR3clEu5r9EYI6BBlEj6GzkaIiCItcRzuJtRGiDi3L5LwsV5shIjQixJXi91mVaCvVeCeRu09S6GSmsrbl6r9uytIaALcxEfl/FcPQkyUHto+hL2Vgiw8Cr8gwt5KYSaa8vw0z7eaV0JU9iQzTT4iuQf+ofW7K8ykpZDnMptQIbzLSoiJRATvakBDZ9vVKFxaBXJFRHWsdTJVmHDZTchuCsuNNysh6reQsykwF+KfAqZv0escxITL19G1An4umH0B/Oq6U8iiXahGRKZcTQo2aynYSIQmdi4KmquN2X4ji4zoQUFsp7/fQ6yJ2Ky5SqG2NLsAGxvYdmZXo8CJlPJ+Ci6E0yt0LqzU1oeOmlUWTiiMjIJXALAKXh1JtGTgKwBYha+hJ9jaZKgAYDIQpiPmKHGQqQpiWkfNVKQiC2OSBzxPmZEsvVQlOYgzlX01+Ll0F7N8Y76ikyN8PXyLszDmK7yMX/Hf0pY6p9YZq4Za9L70JFql8byVz3uwbfEhHa8Yn7syf4O1Dx0KX1OR42KMsyqsje+U1r2jtMnaessFJVFXGx/ppwk8SPWHm6u2m676TNd+fGqB+trCehQXMsYo7yVeOTQh/aUlSndIn3eJ0jXw3KJMIc+eipRBnh8WKQs8Ay5TDfAcv0wtwFiMIqVbXDxNmXrE04Cij8qUBsa1lSmLi00sVBUwvrRIPeNL/8dTzTNG+H+8b3vGeSN2NTqH5K/1itWXudO1Gvsqj/pR5gj4y7dIH4ju6rJI1YugUu1fzkzqiqgtOgXBrWSH3F/eU9qhiO7ztt5RadeBHnLXEnw12sIv0A6qS2jHQ/4h35PBvfwMIH5HO+SQ8teLaxtwF/tStGMeMHPjRr5NCivmrVqnXG6eBYVOj6GLNemf8vFZ3RRbpoUnzgbzXFOB003v6aK7GLXiP+pi0GdTeGkBnhgL24vs+Sd5LkZn4XFFtde/6tNQjy+wuT8pIk6oXzWGiNPUzX10E7GfftWJIppQuJSKdJFiKxy1vkhLYgFNSGzEd8Inr+befWv9UZQB5aq5R7GDcZURJSKctDjrJhL2NfDCCWkitIWz9iVhwSijkxK6qad+aXSSgufcpyq6PfHUoI02IrwyRKpiu2hvHeFYI8Kre6Qq1hTeWtCx/1nIRBOdagL1vGPT6aUYIYVfM1CTPfJx7jR9zwoawsG6+mHb5EcIg3cjhNv/Rwg//i3njpKfIIzeURIyMH+CMHrPTGjF+AVCwl1BgcnmFwgJ9z0FJptfIPz+t5x718onJN675t3ZlE9IvDvP+wPFE5LvP/T5ekonZNxh6bmHtHBCzj2kPj8BunJgspxvx7pL1nPGc8PZtlPuTsq7D9gzFItAnN19lHmns6/CSAHOqNrdvdj3cvucNqw7cHPIE6+QcLe61yvJTGEGy2PdBTy5AULvifKNLjefpzTw1UPeJZ8hBbzYiSlP8FfQzRn0n/nOsW4ajL6QofCZX9hD6PVp3DEYffWjIl0q4gP1Il7u4fcWXYiNmZiX11t46+Ke6r2ZPFpeLOrH9uZ6a+bt6RL5ixLEd1lxT70/nZ1WMgGgyRsITdhGEs4i/BXi9CXH3oGqGZQKeJTTloCXWI/ZozMCx6GkhZl0nhRyhGcO9w6VGKTN57QTs2AIS8bhOJnQg2ndh3gm6DZZXoi6ysIY5qNuj8mnnsGAOUKVFraWMB85LoR+rhtJedA9cnmcq3CmjKYH2DFOrmN1XrRZQJ21jSWQcLwpnLP5eMgcoiHrSPMpZgAhK/qAUHJMq0YCWQ9j/BE8w4YZX0GpSLRBJnXXbqCk/nD9fdwIko6UD6C1HXibnW4hFh0y3E0UP0aGWptL67EiJSfWbWWpCaMJNltCFBAn/2jF3ApEuUHnbhoay0mHZTdgGiE3jUw/soSN7ZumGoahqqqm6a3hp/qmuaPTIrlSywA+/ldiCjO9SCGCMGcpR59STdH0aLxM9UbdEpyXCOIN81Z0PPFJ7DNRRGVaAjKbT2ZjC2NG8zOKfQjiqNi81TkBdicg7nceMhV51GoAmGOYyOYcZUjDhU/pQsVuE6w6Fp6qUG4RYHR6K6jR8YEnsjE/hI2/3yBllBqL9w9NuKqjm0IOPFvBfeg5cijmqTFsytX6aKYcbtdcWSJzO/RU62j9d/2Q5vggKGsezNwtjX3UDfaRKWObpct6SHdFpk/dtctQrVavHY1Rxox2tYarYWk9tj9W/wHyKYDIdACaHQAAAABJRU5ErkJggg==": "http://localhost:8000/storage/" + avatar}
              alt="channel avatar"
            />
            <div>
              <h3>{userName}
              </h3>
              <span className="secondary">
                {/* {profile.subscribersCount} */}
                 {/* subscribers */}
              </span>
            </div>
          </div>

          {/* {profile.isMe && <EditProfile />}

          {!profile.isMe && profile.isSubscribed && (
            <Button grey 
            onClick={() => handleUnsubscribe(profile.id)}
            >
              Subscribed
            </Button>
          )}

          {!profile.isMe && !profile.isSubscribed && (
            <Button
              onClick={() =>
                handleSubscribe({
                  id: profile.id,
                  avatar: profile.avatar,
                  username: profile.username,
                })
              }
            >
              Subscribe
            </Button>
          )} */}
        </div>

        <div className="tabs">
          <ul className="secondary">
            <li
              style={tab === "VIDEOS" ? activeTabStyle : {}}
              onClick={() => setTab("VIDEOS")}
            >
              Videos
            </li>
            {/* <li
              style={tab === "CHANNELS" ? activeTabStyle : {}}
              onClick={() => setTab("CHANNELS")}
            >
              Channels
            </li> */}
            <li
              style={tab === "ABOUT" ? activeTabStyle : {}}
              onClick={() => setTab("ABOUT")}
            >
              About
            </li>
          </ul>
        </div>
      </div>

      <div className="tab">
        {tab === "VIDEOS" && <ChannelTabVideo />}
        {tab === "ABOUT" && <ChannelTabAbout />}
        {tab === "CHANNELS" && <ChannelTabChannels />}
      </div>
    </Wrapper>
  );
};

export default Channel;
