/* eslint-disable react/prop-types */
import { Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { config } from "../../utils/constants";
import { useEffect } from "react";

const { TextArea } = Input;
const InputComment = ({ slug = "", parentCommentId = "", commentValue }) => {
  const { commentBlog, setCommentBlog } = commentValue;
  console.log("commentBlog:", commentBlog);
  const [content, setContent] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const token = localStorage.getItem("token");

  const handleCancel = () => {
    setContent("");
  };

  const HandleRespond = () => {
    setIsSubmit(true);
    async function postRespond() {
      try {
        const response = await axios
          .post(
            `${config.SERVER_HOST}:${config.SERVER_PORT}/api/comment/${slug}`,
            {
              parentCommentId,
              content,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          )
          .finally(() => {
            setIsSubmit(false);
            setContent("");
          });

        if (response.data) {
          const data = response.data.data;
          const commentClone = [...commentBlog];
          commentClone.unshift(data);
          setCommentBlog(commentClone);
        }
      } catch (error) {
        console.log("error:", error);
      }
    }

    postRespond();
  };

  useEffect(() => {
    if (content == "") {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  }, [content]);

  if (!slug) return;
  if (!commentValue) return;
  return (
    <>
      <TextArea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        placeholder="What are your thoughts"
        autoSize={{ minRows: 3, maxRows: 3 }}
      />
      <div className="my-4 text-right action">
        <button className="px-3 py-1 rounded-2xl" onClick={handleCancel}>
          Cancel
        </button>

        <button
          className={`px-3 py-1 text-white  rounded-2xl ${
            isSubmit ? "bg-green-300" : "bg-green-600"
          }`}
          disabled={isSubmit}
          onClick={HandleRespond}
        >
          Respond
        </button>
      </div>
    </>
  );
};

export default InputComment;