/**
 * @file Defines the route for managing resource
 * @author Paras Paras
 */

import createRouter from "./base.js";

import {
  createResource,
  getResources,
  getResource,
  updateResource,
  deleteResource,
} from "../../controllers/v1/Resources.js";

import {
  validatePostResource,
  validatePutResource
} from "../../middleware/validation/Resource.js"

const resourceController = {
  get: getResources,
  getById: getResource,
  create: createResource,
  update: updateResource,
  delete: deleteResource,
};

const resourceRouter = createRouter(resourceController, validatePostResource, validatePutResource);

export default resourceRouter;