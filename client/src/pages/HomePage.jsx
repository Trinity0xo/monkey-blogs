// eslint-disable-next-line no-unused-vars
import React, { Fragment, useState } from "react";
import StickyBox from "react-sticky-box";
import styled from "styled-components";
import { Col, Row } from "antd";
import HomeSide from "../modules/home/HomeSide";
import { Outlet } from "react-router-dom";

const HomePageStyle = styled.div``;

const HomePage = () => {
  return (
    <HomePageStyle>
      <div className="w-full border-t border-gray-300"></div>
      <Row className="px-5 ">
        <Col xs={24} md={15}>
          <Outlet></Outlet>
        </Col>
        <Col xs={0} md={9}>
          <StickyBox>
            <HomeSide></HomeSide>
          </StickyBox>
        </Col>
      </Row>
    </HomePageStyle>
  );
};

export default HomePage;