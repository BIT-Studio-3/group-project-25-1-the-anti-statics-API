/**
 * @file Manages business logic for alerts
 * @author Samuel Batchelor
 */

import alertRepository from "../../repositories/alert.js";

const createAlert = async (req, res) => {
  try {
    await alertRepository.create(req.body);
    const newAlerts = await alertRepository.findAll();
    return res.status(201).json({
      message: "Alert successfully created",
      data: newAlerts,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getAlerts = async (req, res) => {
  try {
    const alerts = await alertRepository.findAll();
    if (!alerts || alerts.length === 0) {
      return res.status(404).json({ message: "No alerts found" });
    }
    return res.status(200).json({
      data: alerts,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getAlert = async (req, res) => {
  try {
    const alert = await alertRepository.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({
        message: `No alert with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: alert,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateAlert = async (req, res) => {
  try {
    let alert = await alertRepository.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({
        message: `No alert with the id: ${req.params.id} found`,
      });
    }
    alert = await alertRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `Alert with the id: ${req.params.id} successfully updated`,
      data: alert,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteAlert = async (req, res) => {
  try {
    const alert = await alertRepository.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({
        message: `No alert with the id: ${req.params.id} found`,
      });
    }
    await alertRepository.delete(req.params.id);
    return res.json({
      message: `Alert with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createAlert,
  getAlerts,
  getAlert,
  updateAlert,
  deleteAlert,
};
