/**
 * @file Manages business logic for Resources
 * @author Paras Paras
 */

import Repository from "../../repositories/generic.js";

const selectObject = {
  id: true,
  name: true,
  contactInfo: true,
  assistance: true,
  conditions: true,
}

const resourceRepository = new Repository("Resource");

const createResource = async (req, res) => {
  try {
    await resourceRepository.create(req.body);
    const newResources = await resourceRepository.findAll(selectObject);
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

const getResources = async (req, res) => {
  try {
    const filters = {
      name: req.query.name || undefined,
      contactInfo: req.query.contactInfo || undefined,
      assistance: req.query.assistance || undefined,
      conditions: req.query.conditions || undefined,
    }
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    const resources = await resourceRepository.findAll(selectObject, filters, sortBy, sortOrder);

    if (!resources || resources.length === 0) {
      return res.status(404).json({ message: "No resources found" });
    }
    return res.status(200).json({
      data: resources,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getResource = async (req, res) => {
  try {
    const resource = await resourceRepository.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({
        message: `No resource with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: resource,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateResource = async (req, res) => {
  try {
    let resource = await resourceRepository.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({
        message: `No resource with the id: ${req.params.id} found`,
      });
    }
    resource = await resourceRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `Resource with the id: ${req.params.id} successfully updated`,
      data: resource,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteResource = async (req, res) => {
  try {
    const resource = await resourceRepository.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({
        message: `No resource with the id: ${req.params.id} found`,
      });
    }
    await resourceRepository.delete(req.params.id);
    return res.json({
      message: `Resource with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createResource,
  getResources,
  getResource,
  updateResource,
  deleteResource,
};
