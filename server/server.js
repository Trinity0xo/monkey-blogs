import express from "express";
import env from "./config/env.js";
import morgan from "morgan";
import cors from "cors";
import MongoDB from "./databases/mongodb/connect.js";
import sequelize from "./databases/mysql/connect.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

import Role from "./models/mysql/Role.js";
import roles from "./constants/roles.js";
import checkToUnbanUsers from "./checkToUnbanUsers.js";
import "./models/mysql/Association.js";
import "./services/passport.js";
import "./cron.js";

import authRoute from "./routes/authRoute.js";
import muteRoute from "./routes/muteRoute.js";
import blockRoute from "./routes/blockRoute.js";
import userRoute from "./routes/userRoute.js";
import reportUserRoute from "./routes/reportUserRoute.js";
import profileRoute from "./routes/profileRoute.js";
import followProfileRoute from "./routes/followProfileRoute.js";
import draftRoute from "./routes/draftRoute.js";
import topicRoute from "./routes/topicRoute.js";
import followTopicRoute from "./routes/followTopicRoute.js";
import artcileRoute from "./routes/articleRoute.js";

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

MongoDB.connect();

sequelize
  .sync({ force: true, logging: true })
  .then(() => {
    console.log("connect to mysql database successfully");
  })
  .then(() => {
    Role.bulkCreate(roles, { ignoreDuplicates: true });
    console.log("roles inserted successfully");
  })
  .then(() => {
    checkToUnbanUsers();
  })
  .catch((error) => {
    console.log("can not connect to mysql database");
    console.log("ERROR =>", error);
  });

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/mute", muteRoute);
app.use("/api/v1/block", blockRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/report-user", reportUserRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/follow-profile", followProfileRoute);
app.use("/api/v1/draft", draftRoute);
app.use("/api/v1/topic", topicRoute);
app.use("/api/v1/follow-topic", followTopicRoute);
app.use("/api/v1/article", artcileRoute);

app.use(errorMiddleware);

app.listen(env.SERVER_PORT, () => {
  console.log(`server is running on port: ${env.SERVER_PORT}`);
});
