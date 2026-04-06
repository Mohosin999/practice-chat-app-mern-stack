// import express, { Request, Response } from "express";
// import { applyMiddleware } from "./middleware";
// import { asyncHandler } from "./middleware/asyncHandler";
// import { errorHandler } from "./middleware/errorHandler";
// import routes from "./routes";

// const app = express();

// applyMiddleware(app);

// app.use(routes);
// app.use(errorHandler);

// app.get(
//   "/",
//   asyncHandler(async (_req: Request, res: Response) => {
//     res.status(200).json({
//       message: "Everything is Okay",
//       status: "OK",
//     });
//   })
// );

// app.get(
//   "/health",
//   asyncHandler(async (_req: Request, res: Response) => {
//     res.status(200).json({
//       message: "Server is healthy",
//       status: "OK",
//     });
//   })
// );

// export default app;

import express, { Request, Response } from "express";
import path from "path";
import { applyMiddleware } from "./middleware";
import { asyncHandler } from "./middleware/asyncHandler";
import { errorHandler } from "./middleware/errorHandler";
import routes from "./routes";

const app = express();

applyMiddleware(app);

app.use(routes);
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  const clientPath = path.resolve(__dirname, "../../frontend/dist");

  app.use(express.static(clientPath));

  app.get(/^(?!\/api).*/, (_req: Request, res: Response) => {
    res.sendFile(path.resolve(clientPath, "index.html"));
  });
}

app.get(
  "/health",
  asyncHandler(async (_req: Request, res: Response) => {
    res.status(200).json({
      message: "Server is healthy",
      status: "OK",
    });
  }),
);

export default app;
