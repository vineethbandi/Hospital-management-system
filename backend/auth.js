function isAuth(connection, req, res, onSuccess) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res
      .status(401)
      .json({ status: "error", reason: "Authorization header is missing" });
    return;
  }
  const encodedCredentials = authHeader.split(" ")[1];
  const decodedCredentials = Buffer.from(
    encodedCredentials,
    "base64"
  ).toString();
  const [username, password] = decodedCredentials.split(":");

  let query;
  query = `select * from User where Username="${username}" and Password="${password}" and Active=1;`;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    //check if user
    if (results.length == 1) {
      onSuccess(results[0]);
    } else {
      res.status(401).json({ status: "error", reason: "Unauthorized Auth" });
    }
  });
}

export default isAuth;
