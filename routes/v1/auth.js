/**
 * @file Defines the auth route
 * @author Samuel Batchelor
 */

import { Router } from "express";

import { register, login } from "../../controllers/v1/auth.js";

const router = Router();

router.route("/register").post(register);

router.route("/login").post(login);

export default router;