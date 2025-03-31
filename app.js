// Import the Express module
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Import the index routes module
import indexRoutes from "./routes/index.js";

//Import the cors module
import cors from 'cors';

// Create an Express application
const app = express();

// Use the PORT environment variable or 3000
const PORT = process.env.PORT || 3000;

// Use the routes module
app.use("/", indexRoutes);

// Start the server on port 3000
app.listen(PORT, () => {
  console.log(
    `Server is listening on port ${PORT}. Visit http://localhost:${PORT}`
  );
});

// Import the alerts routes module
import alertRoutes from "./routes/v1/alerts.js";
import damageRoutes from "./routes/v1/damages.js";


// Import the hazards routes module
import hazardRoutes from "./routes/v1/hazards.js";

// Import the ResourcesAvailability routes module
import resourceRoutes from "./routes/v1/ResourcesAvailability.js";

import logger from "./middleware/logger.js";

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

import auth from "./middleware/auth.js";

import authRoutes from "./routes/v1/auth.js";

import { isContentTypeApplicationJSON } from "./middleware/utils.js";

app.use("/api/v1/auth", authRoutes);

//Use the CORS module
//This will allow request from any origin
app.use(cors());

app.use(isContentTypeApplicationJSON);

// This should be declared above app.use("/", indexRoutes);
app.use(express.urlencoded({ extended: false })); // To parse the incoming requests with urlencoded payloads. For example, form data

// This should be declared under - app.use(urlencoded({ extended: false }));
app.use(express.json()); // To parse the incoming requests with JSON payloads. For example, REST API requests

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Disaster Management System API",
      version: "1.0.0",
      description: "The back-end API for the Anti-Statics Disaster Management System",
      contact: {
        name: "Samuel Batchelor",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/v1/*.js", "./swagger/*.js"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Use the alerts route
app.use("/api/v1/alerts", alertRoutes);
app.use("/api/v1/damages", damageRoutes);


// Use the hazards route
app.use("/api/v1/hazards", hazardRoutes);

// Use the hazards route
app.use("/api/v1/ResourcesAvailability", resourceRoutes);

//Test commit 28/3/2025

// Export the Express application. May be used by other modules. For example, API testing
export default app;