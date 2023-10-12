import React from "react";
import TopicSlider from "../modules/topic/TopicSlider";
import TopicDisplay from "../modules/topic/TopicDisplay";
import ArticleList from "../modules/article/ArticleList";

const TopicPage =()=>{

  return (<>
    <div className="container w-full border-t border-gray-300"></div>
    <div className="max-w-[1200px] mx-auto">
			<TopicSlider/>
      <TopicDisplay/>
      <ArticleList className="sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8"/>
    </div>
  </>)
}

export default TopicPage;