/**
 * @file Manages business logic for damages
 * @author Anti Statics
 */

import Repository from "../../repositories/generic.js";

const damageRepository = new Repository("Damage");

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
    const damages = await damageRepository.findAll();
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
