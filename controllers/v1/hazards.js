/**
 * @file Manages business logic for hazards
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";
const selectObject = {
  name: true,
  type: true,
  level: true,
  city: true,
  location: true,
  description: true,
}
const hazardRepository = new Repository("Hazard");

const createHazard = async (req, res) => {
  try {
    await hazardRepository.create(req.body);
    const newHazards = await hazardRepository.findAll();
    return res.status(201).json({
      message: "Hazard successfully created",
      data: newHazards,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getHazards = async (req, res) => {
  try {
    const filters = {
      name: req.query.name || undefined,
      type: req.query.type || undefined,
      level: req.query.level || undefined,
      city: req.query.city || undefined,
      location: req.query.location || undefined,
      description: req.query.description || undefined,
    }

    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    const hazards = await hazardRepository.findAll(selectObject, filters, sortBy, sortOrder);
    if (!hazards || hazards.length === 0) {
      return res.status(404).json({ message: "No hazards found" });
    }
    return res.status(200).json({
      data: hazards,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getHazard = async (req, res) => {
  try {
    const hazard = await hazardRepository.findById(req.params.id);
    if (!hazard) {
      return res.status(404).json({
        message: `No hazard with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: hazard,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateHazard = async (req, res) => {
  try {
    let hazard = await hazardRepository.findById(req.params.id);
    if (!hazard) {
      return res.status(404).json({
        message: `No hazard with the id: ${req.params.id} found`,
      });
    }
    hazard = await hazardRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `Hazard with the id: ${req.params.id} successfully updated`,
      data: hazard,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteHazard = async (req, res) => {
  try {
    const hazard = await hazardRepository.findById(req.params.id);
    if (!hazard) {
      return res.status(404).json({
        message: `No hazard with the id: ${req.params.id} found`,
      });
    }
    await hazardRepository.delete(req.params.id);
    return res.json({
      message: `Hazard with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createHazard,
  getHazards,
  getHazard,
  updateHazard,
  deleteHazard,
};
