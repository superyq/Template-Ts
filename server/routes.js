async function routes(fastify, options) {
  /** 登录 */
  fastify.post("/login", async (req, res, done) => {
    const { username, password } = req.body;

    try {
      const result = await fastify.mysql.query(
        "SELECT * FROM sys_admins WHERE username=? AND PASSWORD=?",
        [username, password]
      );
      if (result[0].length > 0) {
        return {
          code: 200,
          msg: "success",
          data: result[0][0],
        };
      } else {
        return {
          code: 500,
          msg: "账号或密码错误!",
          data: null,
        };
      }
    } catch (err) {
      return {
        code: 500,
        msg: "error",
        data: err,
      };
    }
  });
}

export default routes;
