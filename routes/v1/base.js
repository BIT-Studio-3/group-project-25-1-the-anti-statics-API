/**
 * @file This file contains and exports the function necessary for creating routes
 * @author Samuel Batchelor
 */

import express from "express";

const createRouter = (controller, postValidator, putValidator) => {
  const router = express.Router();

  router.get("/", controller.get);
  router.get("/:id", controller.getById);
  router.post("/", postValidator, controller.create);
  router.put("/:id", putValidator, controller.update);
  router.delete("/:id", controller.delete);

  return router;
};

export default createRouter;