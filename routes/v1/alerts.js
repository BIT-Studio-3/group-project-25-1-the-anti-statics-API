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

import {
  validatePostAlert,
  validatePutAlert,
} from "../../middleware/validation/alerts.js";

// Create alert controller
const alertController = {
  get: getAlerts,
  getById: getAlert,
  create: createAlert,
  update: updateAlert,
  delete: deleteAlert,
};

const alertRouter = createRouter(alertController);

export default alertRouter;
