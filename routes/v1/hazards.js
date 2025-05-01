/**
 * @file Defines the route for managing hazards
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

import {
  createHazard,
  getHazards,
  getHazard,
  updateHazard,
  deleteHazard,
} from "../../controllers/v1/hazards.js";

import {
  validatePostHazard,
  validatePutHazard
} from "../../middleware/validation/hazards.js"

// Create hazard controller
const hazardController = {
  get: getHazards,
  getById: getHazard,
  create: createHazard,
  update: updateHazard,
  delete: deleteHazard,
};

// Create hazard route
const hazardRouter = createRouter(
  hazardController,
  validatePostHazard,
  validatePutHazard
);

export default hazardRouter;
