/**
 * @file Manages business logic for damages
 * @author Anti Statics
 */

import Repository from "../../repositories/generic.js";

const damageRepository = new Repository("Damage");

const selectObject = {
  reporterName: true,
  damageType: true,
  damageLevel: true,
  location: true,
  countAffected: true,
  cause: true
}

const createDamage = async (req, res) => {
  try {
    await damageRepository.create(req.body);
    const newDamages = await damageRepository.findAll();
    return res.status(201).json({
      message: "Damage successfully recorded",
      data: newDamages,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getDamages = async (req, res) => {
  try {
    const filters = {
      reporterName: req.query.reporterName || undefined,
      damageType: req.query.damageType || undefined,
      damageLevel: req.query.damageLevel || undefined,
      location: req.query.location || undefined,
      countAffected: req.query.countAffected || undefined,
      cause: req.query.cause || undefined
    }

    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    const damages = await damageRepository.findAll(selectObject, filters, sortBy, sortOrder);
    if (!damages || damages.length === 0) {
      return res.status(404).json({ message: "No damages found" });
    }
    return res.status(200).json({
      data: damages,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getDamage = async (req, res) => {
  try {
    const damage = await damageRepository.findById(req.params.id);
    if (!damage) {
      return res.status(404).json({
        message: `No damage record with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: damage,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateDamage = async (req, res) => {
  try {
    let damage = await damageRepository.findById(req.params.id);
    if (!damage) {
      return res.status(404).json({
        message: `No damage record with the id: ${req.params.id} found`,
      });
    }
    damage = await damageRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `Damage record with the id: ${req.params.id} successfully updated`,
      data: damage,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteDamage = async (req, res) => {
  try {
    const damage = await damageRepository.findById(req.params.id);
    if (!damage) {
      return res.status(404).json({
        message: `No damage record with the id: ${req.params.id} found`,
      });
    }
    await damageRepository.delete(req.params.id);
    return res.json({
      message: `Damage record with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createDamage,
  getDamages,
  getDamage,
  updateDamage,
  deleteDamage,
};
