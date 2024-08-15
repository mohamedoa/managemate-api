import {
  getAllInventory,
  getInventoryItem,
  createItem,
  updateItem,
  deleteItem,
} from "../models/inventoryModel.js";

// get/api/inventory
const getAll = async (req, res) => {
  const inventory = await getAllInventory();

  if (!inventory) {
    res.status(500).json({ message: "Unable to retrieve inventory items." });
    return;
  }

  res.json(inventory);
};

// get/api/inventory/:id (join or 2 queries)
const getbyId = async (req, res) => {
  const inventoryItem = await getInventoryItem(req.params.id);

  if (!inventoryItem) {
    res.status(404).json({
      message: `Inventory with ID: ${req.params.id} is not found.`,
    });
    return;
  }

  res.json(inventoryItem);
};

// post/api/inventory
const create = async (req, res) => {
  const body = req.body;

  if (
    !body.warehouse_id ||
    !body.item_name ||
    !body.description ||
    !body.category ||
    !body.status ||
    !body.quantity
  ) {
    return res.status(400).json({
      message:
        "The body needs to be an object with the following keys. warehouse_id, item_name, description, category, status and quantity.",
    });
  }
  const qty = Number(body.quantity);
  if (!Number.isInteger(qty) || qty < 0) {
    return res
      .status(400)
      .json({ message: "Quantity needs to be a positive integear" });
  }

  const newItem = await createItem(body);

  if (!newItem) {
    return res.status(400).json({
      message: `Couldn't find a warehouse with the id: ${body.warehouse_id}`,
    });
  }

  res.status(201).json(newItem);
};

// put/api/inventory/:id
const update = async (req, res) => {
  const newData = req.body;
  const id = req.params.id;
  const { warehouse_id, item_name, description, category, status, quantity } =
    newData;

  if (
    !warehouse_id ||
    !item_name ||
    !description ||
    !category ||
    !status ||
    !quantity
  ) {
    res.status(400).json({
      error: "Missing properties in request body",
      message:
        "The body needs to be an object with the following keys. warehouse_id, item_name, description, category, status and quantity.",
    });
    return;
  }

  const qty = Number(quantity);
  if (!Number.isInteger(qty) || qty < 0) {
    return res
      .status(400)
      .json({ message: "Quantity needs to be a positive integer" });
  }

  const updatedItem = await updateItem(id, newData);

  if (updatedItem === "Warehouse does not exist") {
    return res
      .status(400)
      .json({ message: `Could not find warehouse with id ${warehouse_id}` });
  } else if (!updatedItem) {
    return res
      .status(404)
      .json({ message: `Could not find inventory with id ${id}` });
  }

  res.status(200).json(updatedItem);
};

// delete/api/inventory/:id
const remove = async (req, res) => {
  const delItem = await deleteItem(req.params.id);

  if (!delItem) {
    res.status(404).json({
      message: `Item with ID: ${req.params.id} is not found.`,
    });
    return;
  }

  res.status(204).end();
};

export default { getAll, getbyId, create, update, remove };
