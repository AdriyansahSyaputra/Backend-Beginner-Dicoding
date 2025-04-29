const http = require("http");

const requestListener = (request, response) => {
  // Mengubah Response Header ke JSON
  response.setHeader("Content-Type", "application/json");
  response.setHeader("X-Powered-By", "NodeJS");

  const { method, url } = request;

  // Routing with Method GET & POST, and handle 404
  if (url === "/") {
    if (method === "GET") {
      // Membuat response status sesuai dengan status code
      // 200 = OK
      response.statusCode = 200;
      response.end(
        JSON.stringify({
          message: "Halo! ini adalah halaman home",
        })
      );
    } else {
      // 400 = Bad Request
      response.statusCode = 400;

      // Membuat response body sesuai dengan status code dengan response JSON
      response.end(
        JSON.stringify({
          message: "Halaman tidak ditemukan!",
        })
      );
    }
  } else if (url === "/about") {
    if (method === "GET") {
      // 200 = OK
      response.statusCode = 200;

      // Membuat response body sesuai dengan status code dengan response JSON
      response.end(
        JSON.stringify({
          message: "Halo! ini adalah halaman about",
        })
      );
    } else if (method === "POST") {
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);

        // 200 = OK
        response.statusCode = 200;

        // Membuat response body sesuai dengan status code dengan response JSON
        response.end(
          JSON.stringify({
            message: `Hello ${name}</h1> ini adalah halaman about`,
          })
        );
      });
    } else {
      // 400 = Bad Request
      response.statusCode = 400;

      // Membuat response body sesuai dengan status code dengan response JSON
      response.end(
        JSON.stringify({
          message: `Halaman tidak dapat diakses dengan ${method} request`,
        })
      );
    }
  } else {
    // 400 = Bad Request
    response.statusCode = 404;
    
    // Membuat response body sesuai dengan status code dengan response JSON
    response.end(
      JSON.stringify({
        message: "Halaman tidak ditemukan!",
      })
    );
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server Berjalann pada http://${host}:${port}`);
});
