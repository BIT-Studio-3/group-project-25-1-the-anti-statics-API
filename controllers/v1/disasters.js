/**
 * @file Manages business logic for hazards
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";

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
    const disasters = await disasterRepository.findAll();
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
