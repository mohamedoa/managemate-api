import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export async function getAllWarehouses() {
  try {
    const data = await knex
      .select(
        "warehouses.id",
        "warehouse_name",
        "address",
        "city",
        "country",
        "contact_name",
        "contact_position",
        "contact_phone",
        "contact_email"
      )
      .from("warehouses");
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function createModel(body) {
  try {
    const result = await knex("warehouses").insert(body);

    const newWarehouseId = result[0];
    const createdWarehouse = await knex("warehouses")
      .where({ id: newWarehouseId })
      .first();
    return createdWarehouse;
  } catch (error) {
    return false;
  }
}

export async function getWarehouse(id) {
  try {
    const data = await knex
      .select(
        "id",
        "warehouse_name",
        "address",
        "city",
        "country",
        "contact_name",
        "contact_position",
        "contact_phone",
        "contact_email"
      )
      .from("warehouses")
      .where("id", id)
      .first();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getWarehouseInventoryModel(id) {
  try {
    const data = await knex
      .select("id", "item_name", "category", "status", "quantity")
      .from("inventories")
      .where("warehouse_id", id);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateWarehouse(id, body) {
  try {
    const rowsUpdated = await knex("warehouses").where({ id }).update(body);
    console.log(rowsUpdated);

    const updatedWarehouse = await knex("warehouses").where({ id });
    console.log(updatedWarehouse);
    return updatedWarehouse;
  } catch (error) {
    res.status(400).json({
      message: `Unable to update warehouse with ID ${req.params.id}: ${error}`,
    });
  }
}

export async function deleteWarehouse(id) {
  try {
    const data = await knex("warehouses").where("warehouses.id", id).del();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
