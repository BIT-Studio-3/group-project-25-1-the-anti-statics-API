/**
 * @file Defines the route for managing alerts
 * @author Samuel Batchelor
 */

import express from "express";

import {
  createAlert,
  getAlerts,
  getAlert,
  updateAlert,
  deleteAlert,
} from "../../controllers/v1/alerts.js";

const router = express.Router();

router.post("/", createAlert);

router.get("/", getAlerts);

router.get("/:id", getAlert);

router.put("/:id", updateAlert);

router.delete("/:id", deleteAlert);

export default router;
