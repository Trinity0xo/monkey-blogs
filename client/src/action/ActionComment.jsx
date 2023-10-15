import { useState } from "react";
import { Drawer } from "antd";
import Comment from "../components/comment/Comment";

const ActionComment = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <button
        className="flex items-center gap-2 text-gray-400 transition-all hover:text-black"
        onClick={showDrawer}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
          />
        </svg>

        <span className="inline-block pt-1 text-sm">20</span>
      </button>
      <Drawer
        title={`Responses (20)`}
        placement="right"
        width={400}
        onClose={onClose}
        open={open}
      >
        <Comment></Comment>
      </Drawer>
    </div>
  );
};

export default ActionComment;
