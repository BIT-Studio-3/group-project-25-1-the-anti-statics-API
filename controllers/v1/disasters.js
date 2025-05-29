/**
 * @file Manages business logic for disasters
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";

const selectObject = {
  id: true,
  title: true,
  type: true,
  location: true,
  description: true,
  status: true,
  severity: true,
  controllerId: true,
}

const disasterRepository = new Repository("Disaster");

const createDisaster = async (req, res) => {
  try {
    await disasterRepository.create(req.body);
    const newDisasters = await disasterRepository.findAll();
    return res.status(201).json({
      message: "Disaster successfully created",
      data: newDisasters,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getDisasters = async (req, res) => {
  try {
    const filters = {
      title: req.query.title || undefined,
      type: req.query.type || undefined,
      location: req.query.location || undefined,
      description: req.query.description || undefined,
      status: req.query.status || undefined,
      severity: req.query.severity || undefined,
      controllerId: req.query.controllerId || undefined,
    }

    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    const disasters = await disasterRepository.findAll(selectObject, filters, sortBy, sortOrder);

    if (!disasters || disasters.length === 0) {
      return res.status(404).json({ message: "No disasters found" });
    }
    return res.status(200).json({
      data: disasters,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getDisaster = async (req, res) => {
  try {
    const disaster = await disasterRepository.findById(req.params.id);
    if (!disaster) {
      return res.status(404).json({
        message: `No disaster with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: disaster,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateDisaster = async (req, res) => {
  try {
    let disaster = await disasterRepository.findById(req.params.id);
    if (!disaster) {
      return res.status(404).json({
        message: `No disaster with the id: ${req.params.id} found`,
      });
    }
    disaster = await disasterRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `disaster with the id: ${req.params.id} successfully updated`,
      data: disaster,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteDisaster = async (req, res) => {
  try {
    const disaster = await disasterRepository.findById(req.params.id);
    if (!disaster) {
      return res.status(404).json({
        message: `No disaster with the id: ${req.params.id} found`,
      });
    }
    await disasterRepository.delete(req.params.id);
    return res.json({
      message: `Disaster with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createDisaster,
  getDisasters,
  getDisaster,
  updateDisaster,
  deleteDisaster,
};
