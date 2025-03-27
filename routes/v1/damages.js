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


const damageController = {
  get: getDamages,
  getById: getDamage,
  create: createDamage,
  update: updateDamage,
  delete: deleteDamage,
};

const damageRouter = createRouter(damageController);

export default damageRouter;
