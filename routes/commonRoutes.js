import express from "express";
import ItemsController from "../controllers/itemsController.js";
import OrdersController from "../controllers/ordersController.js";
import inventoryController from "../controllers/inventoryController.js";

const router = express.Router();

// Public Routes
//inventory
router.get("/getallinventory",inventoryController.getAllinventory);
router.get("/getoutofstockinventory",inventoryController.getoutofstockinventory);
router.get("/getlowonstockinventory",inventoryController.getlowonstockinventory);

//items
router.post("/saveitem",ItemsController.saveItem);
router.post("/updateitemquantity",ItemsController.updateItemquantity);
router.get("/getallitems",ItemsController.getAllItems);
router.get("/getitemsbyparameter",ItemsController.getItemsByParameter);
router.post("/edititem",ItemsController.EditItem);


// order 
router.post("/saveorder",OrdersController.saveOrder);
router.get("/getAllorders",OrdersController.getAllOrder);
router.get("/getOrderByID",OrdersController.getOrderById);
router.get("/getorderinvoice",OrdersController.getOrderInvoice);


export default router;
