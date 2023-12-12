/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, Space, Popover } from "antd";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { SearchMain } from "../components/search";
import { Button } from "../components/button";
import Headroom from "react-headroom";
import { useAuth } from "../contexts/auth-context";
import { debounce } from "lodash";
import DropdownSearchMain from "../components/dropdown/DropdownSearchMain";
import useClickOutSide from "../hooks/useClickOutSide";
import { config, icons } from "../utils/constants";
import Notify from "../modules/notification/Notify";
import axios from "axios";
import { apiTopicsSearch, apiUserSearch } from "../api/apisHung";

const HomeStyle = styled.header`
  .wrapper {
    .logo {
      display: block;
      max-width: 35px;
    }
    .headroom {
      z-index: 9999 !important;
    }
  }
`;

// eslint-disable-next-line react/display-name
const Header = memo(() => {
  const { userInfo, setUserInfo } = useAuth();
  const { data } = userInfo;
  const navigate = useNavigate();
  const [inputSearch, setInputSearch] = useState();
  const navigation = useNavigate();
  const [users, setUsers] = useState([]);
  const [topics, setTopics] = useState([]);
  const { show, setShow, nodeRef } = useClickOutSide("searchMain");
  const token = localStorage.getItem("token");
  const [showSearch, setShowSearch] = useState(false);

  const {
    show: showNotification,
    setShow: setShowNotification,
    nodeRef: nodeRefNotification,
  } = useClickOutSide("notify");

  const handleSignOut = useCallback(async () => {
    try {
      const response = await axios.delete(`${config.SERVER_HOST}/auth/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.data) {
        setUserInfo({});
        localStorage.removeItem("token");
        navigate("/sign-in");
      }
    } catch (error) {
      console.log("error:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const content = useCallback(function (username) {
    return (
      <div className="w-[250px] block">
        <h2 className="pb-2 text-sm font-semibold border-b border-gray-300">
          {username && username?.length > 8
            ? username.slice(0, 8) + "..."
            : username}
        </h2>
        <NavLink to={`/write`} className="md:hidden">
          <div className="flex items-center justify-start my-4">
            <span className="w-6 h-6">{icons.writeIcon}</span>{" "}
            <p className="ml-3">Write</p>
          </div>
        </NavLink>
        <NavLink to={`/profile/${username}`}>
          <div className="flex items-center justify-start my-4">
            {icons.userIcon} <p className="ml-3">Profile</p>
          </div>
        </NavLink>

        <NavLink to={`/stories`}>
          <div className="flex items-center justify-start my-4">
            {icons.storyIcon} <p className="ml-3">Stories</p>
          </div>
        </NavLink>
        {data.role !== "user" && (
          <NavLink to={`/dashboard`}>
            <div className="flex items-center justify-start my-4">
              {icons.dashboardIcon} <p className="ml-3">dashboard</p>
            </div>
          </NavLink>
        )}

        <div className="w-full border-t border-gray-300 btn-sign-out text-start">
          <button
            onClick={handleSignOut}
            className="block px-2 py-2 text-gray-400 hover:text-gray-600"
          >
            Sign out
          </button>
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      const response = await apiUserSearch(token, inputSearch, 3);
      if (response?.data) setUsers(response?.data);
    }
    async function fetchTopics() {
      const response = await apiTopicsSearch(token, inputSearch, 3);
      if (response?.data) setTopics(response?.data);
    }
    fetchTopics();
    fetchUsers();
  }, [inputSearch, token]);

  const handleSearch = debounce((e) => {
    setInputSearch(e.target.value);
    setShow(true);
  }, 200);

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (inputSearch) navigation(`/search/?q=${inputSearch}`);
    },
    [inputSearch, navigation]
  );

  return (
    <>
      <HomeStyle>
        <div className="wrapper">
          <Headroom>
            <div className="flex items-center justify-between bg-white  px-5 py-[10px]">
              <div className="flex items-center justify-between ">
                <NavLink to="/">
                  <img srcSet={logo} alt="monkey-blogging" className="logo" />
                </NavLink>
                <form
                  autoComplete="off"
                  onSubmit={handleSearchSubmit}
                  className="relative"
                >
                  <div className="hidden ml-4 md:block">
                    <SearchMain
                      id="search"
                      onChange={handleSearch}
                    ></SearchMain>
                  </div>
                </form>
              </div>
              <div className="flex items-center justify-center header-left">
                <NavLink to={`/write`} className="hidden md:block">
                  <Button kind="secondary" height="40px" className="">
                    {icons.writeIcon}
                    <p className="ml-2 text-lg font-medium">Write</p>
                  </Button>
                </NavLink>
                <div className="md:hidden">
                  <Button
                    kind="secondary"
                    height="40px"
                    onClick={() => setShowSearch(!showSearch)}
                  >
                    {icons.searchIcon}
                  </Button>
                </div>
                <Button
                  kind="secondary"
                  height="40px"
                  notification={"1"}
                  className=""
                  id="notify"
                  onClick={() => setShowNotification(!showNotification)}
                >
                  {icons.notificationIcon}
                </Button>
                <Space direction="vertical" wrap size={16} className="p-1 ml-5">
                  <Popover
                    placement="bottomRight"
                    content={() => content(data?.username, data?.username)}
                    trigger="click"
                  >
                    <Avatar
                      className="cursor-pointer"
                      size="large"
                      src={<img src={data?.avatar} alt="avatar" />}
                    />
                  </Popover>
                </Space>
                {showNotification && (
                  <Notify ref={nodeRefNotification}></Notify>
                )}
              </div>
            </div>
            {showSearch && (
              <div className="py-5 pr-6 md:hidden">
                <SearchMain
                  id="search"
                  className="ml-4"
                  onChange={handleSearch}
                ></SearchMain>
              </div>
            )}
            {show && (
              <DropdownSearchMain
                ref={nodeRef}
                users={users}
                topics={topics}
              ></DropdownSearchMain>
            )}
          </Headroom>
        </div>
      </HomeStyle>
    </>
  );
});

export default Header;