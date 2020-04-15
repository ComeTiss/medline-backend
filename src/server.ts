import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import apolloServer from "./graphql/apolloServer";

import routes from "./routes";
import { validateJwtMiddleware } from "./utils/auth/jwtUtils";
import User from "./db/models/User";
import Lead from "./db/models/Lead";
import Need from "./db/models/Need";

// Server definition
const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'"],
    scriptSrc: ["'self'"],
    childSrc: ["'none'"],
    objectSrc: ["'none'"],
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
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await User.sync({ force: true });
    await Lead.sync({ force: false });
    await Need.sync({ force: false });
  } catch (error) {
    console.error(error);
  }
});
