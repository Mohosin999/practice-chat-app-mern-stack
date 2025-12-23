import "dotenv/config";
// import path from "path";
// import express, { Request, Response } from "express";
import { createServer } from "http";
import app from "./app";
import { connectDB } from "./db/connectDB";
import { initializeSocket } from "./lib/socket";

const server = createServer(app);
const port = process.env.PORT || 5001;

// Initialize Socket
initializeSocket(server);

// if (process.env.NODE_ENV === "production") {
//   const clientPath = path.resolve(__dirname, "../../frontend/dist");

//   app.use(express.static(clientPath));

//   app.get(/^(?!\/api).*/, (_req: Request, res: Response) => {
//     res.sendFile(path.resolve(clientPath, "index.html"));
//   });
// }

const main = async () => {
  try {
    await connectDB();

    server.listen(port, () => {
      console.log(`✅ Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("🚫 Database Error");
    console.log(error);
  }
};

main();
