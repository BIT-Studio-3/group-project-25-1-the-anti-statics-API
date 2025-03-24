// Import the Express module
import express from "express";

// Import the index routes module
import indexRoutes from "./routes/index.js";
// Import the alerts routes module
import alertRoutes from "./routes/v1/alerts.js";

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


//Use the CORS module
//This will allow request from any origin
app.use(cors());

// This should be declared above app.use("/", indexRoutes);
app.use(express.urlencoded({ extended: false })); // To parse the incoming requests with urlencoded payloads. For example, form data

// This should be declared under - app.use(urlencoded({ extended: false }));
app.use(express.json()); // To parse the incoming requests with JSON payloads. For example, REST API requests

// Use the alerts route
app.use("/api/v1/alerts", alertRoutes);


// Export the Express application. May be used by other modules. For example, API testing
export default app;