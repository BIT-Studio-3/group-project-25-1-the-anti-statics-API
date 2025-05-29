/**
 * @file Defines the route for managing Users
 * @author Samuel Batchelor
 */

import createRouter from "./base.js";

import {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
} from "../../controllers/v1/users.js";

import {
    validatePostUser,
    validatePutUser,
} from "../../middleware/validation/users.js";

// Create User controller
const userController = {
    get: getUsers,
    getById: getUser,
    create: createUser,
    update: updateUser,
    delete: deleteUser,
};

const userRouter = createRouter(userController, validatePostUser, validatePutUser);

export default userRouter;
