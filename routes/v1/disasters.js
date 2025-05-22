/**
 * @file Defines the route for managing disasters
 * @author Anti Statics
 */

import createRouter from "./base.js";

import {
  createDisaster,
  getDisasters,
  getDisaster,
  updateDisaster,
  deleteDisaster,
} from "../../controllers/v1/disasters.js";

import {
  validatePostDisaster,
  validatePutDisaster,
} from "../../middleware/validation/disaster.js";

const disasterController = {
  get: getDisasters,
  getById: getDisaster,
  create: createDisaster,
  update: updateDisaster,
  delete: deleteDisaster,
};

const disasterRouter = createRouter(disasterController, validatePostDisaster, validatePutDisaster);

export default disasterRouter;
