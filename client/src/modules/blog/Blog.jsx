/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from "react";
import BlogImage from "./BlogImage";
import BlogMeta from "./BlogMeta";
import BlogTitle from "./BlogTitle";
import styled from "styled-components";
import { Avatar, Popover, Skeleton } from "antd";
import { Link, NavLink } from "react-router-dom";
import Topic from "../topic/Topic";
import useTimeAgo from "../../hooks/useTimeAgo";
import ButtonSaveBlog from "../../components/button/ButtonSaveBlog";
import ButtonActionBlogsAuthor from "../../components/button/ButtonActionBlogsAuthor";
import { icons } from "../../utils/constants";

const BlogStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 20px;
`;

const Blog = ({ blog, isMyProfile, mute = {} }) => {
  const { setMuteId } = mute;
  const {
    id,
    title,
    preview,
    banner,
    slug,
    topic,
    author,
    createdAt,
    isSaved,
    isMyArticle,
  } = blog;

  const checkMyProfile = isMyProfile ? isMyProfile : isSaved;
  const getTimeAgo = useTimeAgo(createdAt);

  const MoreUser = ({ id }) => {
    return (
      <div>
        <NavLink to={`/edit-blog/${id}`}>
          <div>Edit story</div>
        </NavLink>
      </div>
    );
  };

  return (
    <BlogStyle className="border-b border-gray-300">
      <div className="flex-1 pt-3 pr-5">
        <div className="flex items-center">
          <Link to={`/profile/${author?.userInfo?.username}`}>
            <Avatar
              className="cursor-pointer"
              size="large"
              src={<img src={author?.avatar} alt="avatar" />}
            />
          </Link>
          <p className="mx-1"> </p>
          <BlogMeta
            authorName={author?.fullname}
            date={createdAt}
            to={author?.userInfo?.username}
          ></BlogMeta>
        </div>
        <p className="my-2"> </p>
        <BlogTitle to={`/blog/${slug}`} size="big">
          {title}
        </BlogTitle>
        <p className="mt-2 text-base text-gray-400 line-clamp-2">{preview}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center justify-start gap-3 ">
            {topic && <Topic to={`topic/${topic?.slug}`}>{topic?.name}</Topic>}
            <p className="font-medium text-gray-600">{getTimeAgo}</p>
          </div>
          <div className="flex items-center gap-1">
            <ButtonSaveBlog
              BlogId={id}
              checkMyProfile={checkMyProfile}
              isMyArticle={isMyArticle}
            ></ButtonSaveBlog>
            {!isMyArticle ? (
              <ButtonActionBlogsAuthor
                setMuteId={setMuteId}
                blog={blog}
                isMyArticle={isMyArticle}
              ></ButtonActionBlogsAuthor>
            ) : (
              <Popover
                placement="bottom"
                content={<MoreUser id={id} />}
                trigger={"click"}
              >
                <button className="flex items-center text-gray-400 hover:text-gray-500">
                  {icons.moreIcon}
                </button>
              </Popover>
            )}
          </div>
        </div>
      </div>
      {banner ? (
        <BlogImage
          className="flex-shrink-0"
          url={banner}
          alt=""
          to={`/blog/${slug}`}
        ></BlogImage>
      ) : (
        <Skeleton.Image
          active={false}
          style={{
            width: "120px",
            height: "120px",
          }}
        />
      )}
    </BlogStyle>
  );
};

export default Blog;
