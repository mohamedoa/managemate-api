import express from "express";
import inventoryController from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/", inventoryController.getAll);
router.get("/:id", inventoryController.getbyId);
router.post("/", inventoryController.create);
router.put("/:id", inventoryController.update);
router.delete("/:id", inventoryController.remove);

export default router;
