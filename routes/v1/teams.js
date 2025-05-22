/**
 * @file Defines the route for managing teams
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

import {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
} from "../../controllers/v1/teams.js";

import {
  validatePostTeam,
  validatePutTeam,
} from "../../middleware/validation/teams.js";

// Create team controller
const teamController = {
  get: getTeams,
  getById: getTeam,
  create: createTeam,
  update: updateTeam,
  delete: deleteTeam,
};

// Create team route
const teamRouter = createRouter(teamController, validatePostTeam, validatePutTeam);

export default teamRouter;
