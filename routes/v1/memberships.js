/**
 * @file Defines the route for managing memberships
 * @author Anti Statics
 */

import createRouter from "./base.js";

import {
  createMemberShip,
  getMemberShips,
  getMemberShip,
  updateMemberShip,
  deleteMemberShip,
} from "../../controllers/v1/members.js";

import {
  validatePostTeamMembership,
  validatePutTeamMembership,
} from "../../middleware/validation/members.js";

const memberShipController = {
  get: getMemberShips,
  getById: getMemberShip,
  create: createMemberShip,
  update: updateMemberShip,
  delete: deleteMemberShip,
};

const memberShipRouter = createRouter(memberShipController, validatePostTeamMembership, validatePutTeamMembership);

export default memberShipRouter;
