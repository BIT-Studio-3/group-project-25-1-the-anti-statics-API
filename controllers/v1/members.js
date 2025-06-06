/**
 * @file Manages business logic for teams
 * @author Samuel Batchelor
 */

import Repository from "../../repositories/generic.js";

const selectObject = {
  id: true,
  responseTeamId: true,
  userId: true,
  member: true,
  role: true,
}

const memberShipRepository = new Repository("TeamMembership");

const createMemberShip = async (req, res) => {
  try {
    await memberShipRepository.create(req.body);
    const newMemberShips = await memberShipRepository.findAll(selectObject);
    return res.status(201).json({
      message: "Membership successfully created",
      data: newMemberShips,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getMemberShips = async (req, res) => {
  try {
    const filters = {
      responseTeamId: req.query.responseTeamId || undefined,
      userId: req.query.userId || undefined,
      member: req.query.member || undefined,
      role: req.query.role || undefined,
    }

    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    const memberShips = await memberShipRepository.findAll(
      selectObject, filters, sortBy, sortOrder
    );
    if (!memberShips || memberShips.length === 0) {
      return res.status(404).json({ message: "No memberships found" });
    }
    return res.status(200).json({
      data: memberShips,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getMemberShip = async (req, res) => {
  try {
    const memberShip = await memberShipRepository.findById(req.params.id);
    if (!memberShip) {
      return res.status(404).json({
        message: `No membership with the id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: memberShip,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateMemberShip = async (req, res) => {
  try {
    let memberShip = await memberShipRepository.findById(req.params.id);
    if (!memberShip) {
      return res.status(404).json({
        message: `No membership with the id: ${req.params.id} found`,
      });
    }
    memberShip = await memberShipRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `Membership with the id: ${req.params.id} successfully updated`,
      data: memberShip,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteMemberShip = async (req, res) => {
  try {
    const memberShip = await memberShipRepository.findById(req.params.id);
    if (!memberShip) {
      return res.status(404).json({
        message: `No member ship with the id: ${req.params.id} found`,
      });
    }
    await memberShipRepository.delete(req.params.id);
    return res.json({
      message: `Membership with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export {
  createMemberShip,
  getMemberShips,
  getMemberShip,
  updateMemberShip,
  deleteMemberShip,
};
