import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../middlewares/async-handler.middleware";
import { Role } from "../../../database/models/index.models";

// 1. Create a new roles (admin)
const createRole = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { name } = req.body;
    const role = await Role.create({ name });
    if (!role) {
      return res.status(500).json({ message: "Failed to create role." });
    }
    return res.status(201).json({ message: "Role created successfully", role });
  }
);

// 2. Get all approved roles (admin)
const getRoles = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const roles = await Role.find();
    res.status(200).json({ roles });
  }
);

// 3. Get a specific role by ID (admin)
const getRole = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const role = await Role.findOne({ _id: id });
    if (!role) return res.status(404).json({ message: "Role not found" });
    return res.status(200).json({ role });
  }
);

// 4. Update a specific post (Admin only)
const updateRole = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { name } = req.body;
    const { id } = req.params;
    const role = await Role.findOneAndUpdate(
      { _id: id },
      { name },
      { new: true }
    );

    if (!role) {
      return res.status(404).json({ message: "role not found" });
    }

    return res.status(200).json({ message: "role updated successfully", role });
  }
);

// 5. Delete a specific Role (Admin only)
const deleteRole = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const role = await Role.findOneAndDelete({ _id: id });
    if (!role) {
      return res.status(404).json({ message: "role not found" });
    }

    return res.status(204);
  }
);

export { createRole, getRoles, getRole, updateRole, deleteRole };
