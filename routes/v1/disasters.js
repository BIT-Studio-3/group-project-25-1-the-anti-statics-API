/**
 * @file Defines the route for managing hazards
 * @author Anti Statics
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
  validatePutHazard,
} from "../../middleware/validation/hazards.js";

const damageController = {
  get: getHazards,
  getById: getHazard,
  create: createHazard,
  update: updateHazard,
  delete: deleteHazard,
};

const damageRouter = createRouter(damageController, validatePostHazard, validatePutHazard);

export default damageRouter;
