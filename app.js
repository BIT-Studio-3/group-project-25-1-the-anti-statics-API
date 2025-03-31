// Import the Express module
import express from "express";

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

app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>404 - Not Found</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .container {
            text-align: center;
            padding: 30px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          }
          h1 {
            font-size: 100px;
            margin-bottom: 10px;
            color: #e74c3c;
          }
          p {
            font-size: 18px;
            margin-bottom: 20px;
          }
          a {
            font-size: 16px;
            color: #3498db;
            text-decoration: none;
            border: 1px solid #3498db;
            padding: 10px 15px;
            border-radius: 5px;
          }
          a:hover {
            background-color: #3498db;
            color: #fff;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>404</h1>
          <p>Oops! The page you requested does not exist.</p>
          <a href="/">Go back to the homepage</a>
        </div>
      </body>
    </html>
  `);
});

// Start the server on port 3000
app.listen(PORT, () => {
  console.log(
    `Server is listening on port ${PORT}. Visit http://localhost:${PORT}`
  );
});

// Import the alerts routes module
import alertRoutes from "./routes/v1/alerts.js";

// Import the hazards routes module
import hazardRoutes from "./routes/v1/hazards.js";

//Use the CORS module
//This will allow request from any origin
app.use(cors());

// This should be declared above app.use("/", indexRoutes);
app.use(express.urlencoded({ extended: false })); // To parse the incoming requests with urlencoded payloads. For example, form data

// This should be declared under - app.use(urlencoded({ extended: false }));
app.use(express.json()); // To parse the incoming requests with JSON payloads. For example, REST API requests

// Use the alerts route
app.use("/api/v1/alerts", alertRoutes);

// Use the hazards route
app.use("/api/v1/hazards", hazardRoutes);

//Test commit 28/3/2025

// Export the Express application. May be used by other modules. For example, API testing
export default app;