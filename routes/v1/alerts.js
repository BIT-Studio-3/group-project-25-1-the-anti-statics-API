/**
 * @file Defines the route for managing alerts
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

import {
  createAlert,
  getAlerts,
  getAlert,
  updateAlert,
  deleteAlert,
} from "../../controllers/v1/alerts.js";

// Create alert controller
const alertController = {
  get: getAlerts,
  getById: getAlert,
  create: createAlert,
  update: updateAlert,
  delete: deleteAlert,
};

// Create alert route
const alertRouter = createRouter(alertController);

export default alertRouter;
