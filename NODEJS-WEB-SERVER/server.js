const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.statusCode = 200;

  const { method, url } = request;

  // Routing with Method GET & POST, and handle 404
  if (url === "/") {
    if (method === "GET") {
      response.end("<h1>Home Page</h1>");
    } else {
      response.statusCode = 404;
      response.end("<h1>404 Page Not Found</h1>");
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.end("<h1>About Page</h1>");
    } else if (method === "POST") {
      let body = [];

      request.on("data", (chunk) => {
        body.push(chunk);
      });

      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.end(`<h1>Hello ${name}</h1> ini adalah halaman about`);
      });
    } else {
      response.statusCode = 404;
      response.end("<h1>404 Page Not Found</h1>");
    }
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server Berjalann pada http://${host}:${port}`);
});
