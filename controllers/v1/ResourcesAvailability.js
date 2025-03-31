/**
 * @file Manages business logic for Resources Availability
 * @author Paras Paras
 */

import Repository from "../../repositories/generic.js";

const resourceRepository = new Repository("ResourcesAvailability");

const createResourceAvailability = async (req, res) => {
    try {
      await resourceRepository.create(req.body);
      const newResources = await resourceRepository.findAll();
      return res.status(201).json({
        message: "Resource successfully created",
        data: newResources,
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  };