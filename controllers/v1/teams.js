/**
 * @file Manages business logic for teams
 * @author Samuel Batchelor
 */

import prisma from "../../prisma/client.js";
import Repository from "../../repositories/generic.js";

const selectObject = {
  id: true,          
  disasterId: true,
  createdAt: true,
  updatedAt: true,   
  disaster: {
    select: {
      title: true
    }
  }
}

const teamRepository = new Repository("ResponseTeam");

const createTeam = async (req, res) => {
  try {
    const { disasterId } = req.body
    // Find if a disaster already has one team
    const existingDisaster = await prisma.responseTeam.findFirst({
      where: { disasterId },
    });

    if (existingDisaster) {
      return res.status(409).json({ message: `There is already a team for this disaster` });
    }

    await teamRepository.create(req.body);
    const newTeams = await teamRepository.findAll();
    return res.status(201).json({
      message: "Team successfully created",
      data: newTeams,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getTeams = async (req, res) => {
  try {
    const teams = await teamRepository.findAll(selectObject);
    if (!teams || teams.length === 0) {
      return res.status(404).json({ message: "No teams found" });
    }
    return res.status(200).json({
      data: teams,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getTeam = async (req, res) => {
  try {
    const team = await teamRepository.findById(req.params.id);
    if (!team) {
      return res.status(404).json({
        message: `No team with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: team,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateTeam = async (req, res) => {
  try {
    let team = await teamRepository.findById(req.params.id);
    if (!team) {
      return res.status(404).json({
        message: `No team with the id: ${req.params.id} found`,
      });
    }
    team = await teamRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `team with the id: ${req.params.id} successfully updated`,
      data: team,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const team = await teamRepository.findById(req.params.id);
    if (!team) {
      return res.status(404).json({
        message: `No team with the id: ${req.params.id} found`,
      });
    }
    await teamRepository.delete(req.params.id);
    return res.json({
      message: `Team with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  deleteTeam,
};
