// Import the Express module
import express from "express";

// Import the index controllers module
import { getIndex } from "../controllers/index.js";

// Create an Express router
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve test data
 *     tags:
 *       - Main
 *     description: Returns test data from the index route.
 *     responses:
 *       200:
 *         description: A JSON object containing the test data.
 *       500:
 *         description: Internal server error if the request fails.
 */

// Create a GET route
router.get("/", getIndex);

// Export the router
export default router;