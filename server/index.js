const express = require("express");
const http = require("http");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);

app.use(router);

server.listen(PORT, () => console.log(`server started on port ${PORT}`));
