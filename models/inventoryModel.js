import initKnex from "knex";
import configuration from "../knexfile.js";
import { response } from "express";
const knex = initKnex(configuration);

export async function getAllInventory() {
  try {
    const data = await knex
      .select(
        "inventories.id",
        "item_name",
        "category",
        "status",
        "quantity",
        "warehouse_name"
      )
      .from("inventories")
      .join("warehouses", "warehouses.id", "inventories.warehouse_id");
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getInventoryItem(id) {
  try {
    const data = await knex
      .select(
        "inventories.id",
        "item_name",
        "description",
        "category",
        "status",
        "quantity",
        "warehouse_name"
      )
      .from("inventories")
      .join("warehouses", "inventories.warehouse_id", "warehouses.id")
      .where("inventories.id", id)
      .first();

    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function createItem(body) {
  try {
    const reponse = await knex("inventories").insert(body);
    const newItemID = reponse[0];
    const createdItem = await knex("inventories")
      .where({ id: newItemID })
      .first();

    return createdItem;
  } catch (error) {
    return false;
  }
}

export async function updateItem(id, newData) {
  const warehouseId = newData.warehouse_id;
  const warehouseExists = await knex("warehouses")
    .where({ id: warehouseId })
    .first();

  if (!warehouseExists) {
    return "Warehouse does not exist";
  }

  if (newData.warehouse_id)
    try {
      const response = await knex("inventories").where({ id }).update(newData);

      const updatedItem = await knex
        .select(
          "inventories.id",
          "warehouse_id",
          "item_name",
          "description",
          "category",
          "status",
          "quantity"
        )
        .from("inventories")
        .where({ id })
        .first();

      return updatedItem;
    } catch (error) {
      console.error(error);
      return false;
    }
}

export async function deleteItem(id) {
  try {
    const data = await knex("inventories").where("inventories.id", id).del();
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
