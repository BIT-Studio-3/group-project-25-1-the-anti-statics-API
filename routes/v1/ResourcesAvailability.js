/**
 * @file Defines the route for managing resource availability
 * @author Paras Paras
 */

import createRouter from "./base.js";

import {
  createResourceAvailability,
  getResourcesAvailability,
  getResourceAvailability,
  updateResourceAvailability,
  deleteResourceAvailability,
} from "../../controllers/v1/ResourcesAvailability.js";

const resourceController = {
    get: getResourcesAvailability,
    getById: getResourceAvailability,
    create: createResourceAvailability,
    update: updateResourceAvailability,
    delete: deleteResourceAvailability,
  };

const resourceRouter = createRouter(resourceController);

export default resourceRouter;