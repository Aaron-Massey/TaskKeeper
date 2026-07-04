import http from 'http';
import loadStatic from "./server/load_static.js";
import { Task, TaskList } from './server/composite.js';

const http_server = http.createServer(loadStatic);

const defaultPort = 3000;
http_server.listen(process.env.PORT || defaultPort, () => {
  console.log(`HTTP server running on port ${process.env.PORT || defaultPort}`);
});
