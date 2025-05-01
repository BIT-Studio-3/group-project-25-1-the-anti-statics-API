/**
 * @file Defines the route for managing damages
 * @author Anti Statics
 */

import createRouter from "./base.js";

import {
  createDamage,
  getDamages,
  getDamage,
  updateDamage,
  deleteDamage,
} from "../../controllers/v1/damages.js";

import {
  validatePostDamage,
  validatePutDamage
} from "../../middleware/validation/damages.js";


const damageController = {
  get: getDamages,
  getById: getDamage,
  create: createDamage,
  update: updateDamage,
  delete: deleteDamage,
};

const damageRouter = createRouter(damageController, validatePostDamage, validatePutDamage);

export default damageRouter;
