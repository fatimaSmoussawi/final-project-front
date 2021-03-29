import React, { useState, useRef, useEffect } from "react";

// import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
// import Subscriptions from "./Subscriptions";
import {
    HomeIcon,
    TrendingIcon,
    SubIcon,
    LibIcon,
    HistoryIcon,
    VidIcon,
    LikeIcon,
    SignoutIcon,
} from "./Icons";
// import { closeSidebar } from "../reducers/sidebar";

const SidebarWrapper = styled.div`
    position: fixed;
    top: 55px;
    left: 0;
    height: 100vh;
    width: 240px;
    background: ${(props) => props.theme.grey};
    padding-top: 1rem;
    overflow: auto;
    padding-bottom: 1.5rem;
    transition: all 0.3s;
    z-index: 2;

    &::-webkit-scrollbar {
        width: 0;
    }

    .icon {
        display: flex;
        align-items: center;
        padding: 0.2rem 0;
        padding-left: 1.5rem;
        margin-bottom: 0.4rem;
    }

    .icon:not(.hover-disable):hover {
        background: ${(props) => props.theme.darkGrey};
        cursor: pointer;
    }

    .active div {
        background: ${(props) => props.theme.darkGrey};
        cursor: pointer;
    }

    .active svg {
        fill: #fff;
    }

    .icon span {
        padding-left: 1rem;
        position: relative;
        top: 1px;
    }

    @media screen and (max-width: 1093px) {
        transform: translateX(-100%);

        ${(props) =>
            props.open &&
            css`
                transform: translateX(0);
            `}
    }
`;

const Sidebar = () => {
    const useOnClickOutside = (ref, handler) => {
        useEffect(() => {
            const listener = (event) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
            };
        }, [ref, handler]);
    };
    //   const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const node = useRef();
    useOnClickOutside(node, () => setOpen(false));
    //   const { sidebar: open } = useSelector((state) => state.sidebar);

    //   const handleCloseSidebar = () => {
    //     dispatch(closeSidebar());
    //   };

    let history = useHistory();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("userName");
        localStorage.removeItem("avatar");
        localStorage.removeItem("cover");
        localStorage.removeItem("channelDescription");
        history.push("/");
        window.location.reload(true);

    };

    return (
        <div ref={node}>
            <SidebarWrapper open={open} setOpen={setOpen}>
                <NavLink
                    // onClick={handleCloseSidebar}
                    open={open}
                    onClick={() => setOpen(!open)}
                    exact
                    to="/home"
                    activeClassName="active"
                >
                    <div className="icon">
                        <HomeIcon />
                        <span>Home</span>
                    </div>
                </NavLink>

                {/* <NavLink
                    // onClick={handleCloseSidebar}
                    setOpen={setOpen}
                    to="/feed/trending"
                    activeClassName="active"
                >
                    <div className="icon">
                        <TrendingIcon />
                        <span>Trending</span>
                    </div>
                </NavLink> */}

                <NavLink
                    // onClick={handleCloseSidebar}
                    setOpen={setOpen}
                    to="/feed/subscriptions"
                    activeClassName="active"
                >
                    <div className="icon">
                        <SubIcon />
                        <span>Channels</span>
                    </div>
                </NavLink>

                <div className="ruler"></div>

                {/* <NavLink
                    // onClick={handleCloseSidebar}
                    setOpen={setOpen}
                    to="/feed/library"
                    activeClassName="active"
                >
                    <div className="icon">
                        <LibIcon />
                        <span>Library</span>
                    </div>
                </NavLink> */}

                {/* <NavLink
                    // onClick={handleCloseSidebar}
                    setOpen={setOpen}
                    to="/feed/history"
                    activeClassName="active"
                >
                    <div className="icon">
                        <HistoryIcon />
                        <span>History</span>
                    </div>
                </NavLink> */}

                <NavLink
                    // onClick={handleCloseSidebar}
                    setOpen={setOpen}
                    to="/feed/my_videos"
                    activeClassName="active"
                >
                    <div className="icon">
                        <VidIcon />
                        <span>Your videos</span>
                    </div>
                </NavLink>

                {/* <NavLink
                    // onClick={handleCloseSidebar}
                    setOpen={setOpen}
                    to="/feed/liked_videos"
                    activeClassName="active"
                >
                    <div className="icon">
                        <LikeIcon />
                        <span>Liked videos</span>
                    </div>
                </NavLink> */}
                <NavLink
                    // onClick={handleCloseSidebar}
                    setOpen={setOpen}
                    to="/logout"
                    activeClassName="active"
                    onClick = {logout}
                >
                    <div className="icon">
                        <SignoutIcon />
                        <span >Logout</span>
                    </div>
                </NavLink>

                <div className="ruler"></div>

                {/* <Subscriptions /> */}
            </SidebarWrapper>
        </div>
    );
};

export default Sidebar;