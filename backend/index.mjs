import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import { PORT, feUrlDev, feUrlProd, mongodb } from "./config.mjs";
import http from 'http';
import { initSocket } from './src/socket/socket.mjs';
import router from "./src/routes/route.mjs";


const app = express();

const allowedOrigins = [
  feUrlDev,           // for local dev
  feUrlProd      // your Vercel frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

mongoose.connect(mongodb, {
  useNewUrlParser: true,
})
  .then(() => { console.log("MongoDB connected successfully") })
  .catch((err) => { console.log("MongoDB connection failed", err) });

app.use('/api', router);

// Create http server with express app
const server = http.createServer(app);

// Initialize socket server with http server
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});