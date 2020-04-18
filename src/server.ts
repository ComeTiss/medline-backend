import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import apolloServer from "./graphql/apolloServer";

import routes from "./routes";
import { validateJwtMiddleware } from "./utils/auth/jwtUtils";
import UserDao from "./dao/UserDao";
import mockUser from "./__tests__/mocks/mock_verified_user.json";

// Server definition
const app = express();
const PORT = process.env.PORT || 4000;

const extraDirectives = process.env.NODE_ENV === "production" ? {
  defaultSrc: ["'self'"],
  styleSrc: ["'self'"],
  scriptSrc: ["'self'"],
} : null;

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    childSrc: ["'none'"],
    objectSrc: ["'none'"],
    ...extraDirectives,
  },
}));
app.use(helmet.noCache());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use("/graphql", validateJwtMiddleware);

// Graphql
apolloServer.applyMiddleware({ app });

// Authentication routes
routes(app);

// Start HTTP server
const server = app.listen(PORT, async () => {
  if (process.env.NODE_ENV === "development") {
    await UserDao.create(mockUser);
    console.log("\n[DEV ONLY] Created verified user\n");
  }
  console.log(`Server running on port ${PORT}`);
});

export default server;
