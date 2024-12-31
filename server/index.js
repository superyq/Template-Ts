import Fastify from "fastify";
import routes from "./routes.js";
import fastifyMysql from "@fastify/mysql";

const fastify = Fastify({
  logger: true,
});

/** 连接数据库 */
fastify.register(fastifyMysql, {
  host: "127.0.0.1",
  port: 3307,
  user: "root",
  password: "923912",
  database: "twogod",
  charset: "utf8mb4",
  promise: true,
});

/** 接受所有媒体类型 */
fastify.addContentTypeParser("*", function (request, payload, done) {
  var data = "";
  payload.on("data", (chunk) => {
    data += chunk;
  });
  payload.on("end", () => {
    done(null, data);
  });
});

/** 注册接口 */
fastify.register(routes);

/** 启动服务 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log("webserver is runing");
  } catch (err) {
    console.log(err);
  }
};
start();
