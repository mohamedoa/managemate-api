import express from "express";
import warehouseController from "../controllers/warehouseController.js";

const router = express.Router();

router.get("/", warehouseController.getAll);
router.get("/:id", warehouseController.getbyId);
router.get("/:id/inventories", warehouseController.getWarehouseInventory);
router.post("/", warehouseController.create);
router.put("/:id", warehouseController.update);
router.delete("/:id", warehouseController.remove);

export default router;
