/**
 * @file Defines the auth route
 * @author Samuel Batchelor
 */

import { Router } from "express";

import { register, login, getUsers } from "../../controllers/v1/auth.js";

const router = Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/users").get(getUsers);

export default router;