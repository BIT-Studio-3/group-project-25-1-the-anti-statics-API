import Repository from "../../repositories/generic.js";
import { Role } from "@prisma/client";

const userRepository = new Repository("User");

const selectObject = {
    id: true,
    firstName: true,
    lastName: true,
    organization: true,
    role: true,
    status: true
}

const createUser = async (req, res) => {
    try {
        if (req.user.role === Role.BASIC) {
            return res.status(403).json({
                message: "BASIC users cannot create users",
            });
        }
        await userRepository.create(req.body);
        const newUsers = await userRepository.findAll();
        return res.status(201).json({
            message: "User successfully created",
            data: newUsers,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const filters = {
            firstName: req.query.firstName || undefined,
            lastName: req.query.lastName || undefined,
            organization: req.query.organization || undefined,
            role: req.query.role || undefined,
            status: req.query.status || undefined
        }

        const sortBy = req.query.sortBy || "id";
        const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

        const users = await userRepository.findAll(selectObject, filters, sortBy, sortOrder);
        const { role, id } = req.body;

        if (role === Role.BASIC) {
            return users.filter(user => user.id === id);
        }
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json({
            data: users,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const getUser = async (req, res) => {
    try {
        const { role, id } = req.body;
        const user = await userRepository.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: `No user with the id: ${req.params.id} found`,
            });
        }
        if (role === Role.BASIC) {
            if (user.id !== id) {
                return res.status(403).json({
                    message: `You are not authorized to access other users data`,
                });
            }
        }

        return res.status(200).json({
            data: user,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const updateUser = async (req, res) => {
    try {

        const { role } = req.body;

        let user = await userRepository.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: `No user with the id: ${req.params.id} found`,
            });
        }
        if (role === Role.ADMIN) {
            if (user.role !== Role.BASIC && user.id !== id)
                return res.status(403).json({
                    message: "ADMIN cannot update other ADMIN users",
                });
        }
        else if (role === Role.BASIC && user.id !== id) {
            return res.status(403).json({
                message: "BASIC cannot update other users",
            });
        }

        user = await userRepository.update(req.params.id, req.body);
        return res.status(200).json({
            message: `user with the id: ${req.params.id} successfully updated`,
            data: user,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { role, id } = req.body;
        const user = await userRepository.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: `No user with the id: ${req.params.id} found`,
            });
        }
        if (user.id === id) {
            return res.status(403).json({
                message: "You cannot delete your own account",
            });
        }
        else if (role === Role.ADMIN) {
            if (user.role === role && user.id !== id) {
                return res.status(403).json({
                    message: `ADMINs cannot delete other ADMINs `,
                });
            }
        }
        else if (role === Role.BASIC) {
            if (user.id !== id) {
                return res.status(403).json({
                    message: `Deleting another user is not allowed`,
                });
            }
        }
        await userRepository.delete(req.params.id);
        return res.json({
            message: `User with the id: ${req.params.id} successfully deleted`,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

export {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};
