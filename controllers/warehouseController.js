import {
  getAllWarehouses,
  getWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getWarehouseInventoryModel,
  createModel,
} from "../models/warehouseModel.js";

// get/api/warehouses
const getAll = async (req, res) => {
  const warehouses = await getAllWarehouses();

  if (!warehouses) {
    res.status(500).json({ message: "Unable to retrieve warehouses" });
    return;
  }

  res.json(warehouses);
};

// get/api/warehouses/:id (join or 2 queries)
const getbyId = async (req, res) => {
  const warehouse = await getWarehouse(req.params.id);

  if (!warehouse) {
    res.status(404).json({
      message: `Warehouse with ID: ${req.params.id} is not found.`,
    });
    return;
  }

  res.json(warehouse);
};

// GET /api/warehouses/:id/inventories
const getWarehouseInventory = async (req, res) => {
  const warehouse = await getWarehouseInventoryModel(req.params.id);
  console.log(warehouse);

  if (!warehouse) {
    res.status(500).json({ message: `Internal server error` });
    return;
  }
  if (warehouse.length === 0) {
    res.status(404).json({
      message: `Couldn't find any warehouse with id: ${req.params.id}`,
    });
    return;
  }

  res.json(warehouse);
};

// post/api/warehouses
const create = async (req, res) => {
  if (
    !req.body.warehouse_name ||
    !req.body.address ||
    !req.body.city ||
    !req.body.country ||
    !req.body.contact_name ||
    !req.body.contact_position ||
    !req.body.contact_phone ||
    !req.body.contact_email
  ) {
    res
      .status(400)
      .json({ message: "Please provide information for all input fields" });
    return;
  }
  const emailRegex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const isValidEmail = emailRegex.test(req.body.contact_email);

  if (!isValidEmail) {
    res.status(400).json({
      message: "Please provide a valid email address",
    });
    return;
  }

  const NumberRegex =
    /^((\+1)|1)? ?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})( ?(ext\.? ?|x)(\d*))?$/;
  const isValidNumber = NumberRegex.test(req.body.contact_phone);

  if (!isValidNumber) {
    res.status(400).json({
      message: "Please provide a valid US phone number",
    });
    return;
  }

  const newWarehouse = await createModel(req.body);

  if (!newWarehouse) {
    res.status(400).json({
      message: "Could not create warehouse",
    });
    return;
  }

  res.json(newWarehouse);
};

// put/api/warehouses/:id
const update = async (req, res) => {
  if (
    !req.body.warehouse_name &&
    !req.body.address &&
    !req.body.city &&
    !req.body.country &&
    !req.body.contact_name &&
    !req.body.contact_position &&
    !req.body.contact_phone &&
    !req.body.contact_email
  ) {
    res
      .status(400)
      .json({ message: "Please provide information for all input fields" });
    return;
  }
  const emailRegex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const isValidEmail = emailRegex.test(req.body.contact_email);

  if (!isValidEmail) {
    res.status(400).json({
      message: "Please provide a valid email address",
    });
    return;
  }

  const NumberRegex =
    /^((\+1)|1)? ?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})( ?(ext\.? ?|x)(\d*))?$/;
  const isValidNumber = NumberRegex.test(req.body.contact_phone);

  if (!isValidNumber) {
    res.status(400).json({
      message: "Please provide a valid US phone number",
    });
    return;
  }

  const updatedWarehouse = await updateWarehouse(req.params.id, req.body);

  if (!updatedWarehouse) {
    res.status(400).json({
      message: "Could not update warehouse",
    });
    return;
  }

  res.json(updatedWarehouse);
};

// delete/api/warehouses/:id
const remove = async (req, res) => {
  const delWarehouse = await deleteWarehouse(req.params.id);

  if (!delWarehouse) {
    res.status(404).json({
      message: `Warehouse with ID: ${req.params.id} is not found.`,
    });
    return;
  }

  res.status(204).end();
};

export default {
  getAll,
  getbyId,
  create,
  update,
  remove,
  getWarehouseInventory,
};
