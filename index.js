import express from "express";
import "dotenv/config.js";
import warehouseRoute from "./routes/warehouseRoutes.js";
import inventoryRoute from "./routes/inventoryRoutes.js";
import cors from "cors";

const PORT = process.env.PORT;
const BACKEND_URL = process.env.BACKEND_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();
app.use(express.json());

app.use(cors({ origin: FRONTEND_URL }));

app.use("/api/warehouses/", warehouseRoute);
app.use("/api/inventory/", inventoryRoute);

app.listen(PORT, () => {
  console.log(`Server is running on ${BACKEND_URL}:${PORT}`);
});
