/* eslint-disable react/prop-types */
import { Fragment } from "react";
import Topic from "./Topic";

const TopicList = ({ data = [], className = "" }) => {
  return (
    <Fragment>
      <div className={` ${className}`}>
        {data?.length !== 0 &&
          data.map((value, index) => (
            <Topic to={value.slug} key={index} className="mb-3 mr-3">
              {value.name}
            </Topic>
          ))}
      </div>
    </Fragment>
  );
};

export default TopicList;
