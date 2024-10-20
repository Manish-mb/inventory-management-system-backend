import { sendError, sendResult } from "../constant/HttpResponse.js";
import ItemsModel from "../models/Items.js";
class inventoryController {
  static getAllinventory = async (req, res) => {
    try {
      ItemsModel.find()
        .then((result) => {
          sendResult(res, result, "Data Retrived");
        })
        .catch((error) => {
          console.log(error);
          sendError(res, error, "Something Went Wrong");
        });
    } catch (error) {
      console.log(error);
      sendError(res, error, "Something Went Wrong");
    }
  };
  static getoutofstockinventory = async (req, res) => {
    try {
      const outOfStockItems = await ItemsModel.find({ quantity: 0 });
      sendResult(res, outOfStockItems, "Data Retrived");
    } catch (error) {
      console.log(error);
      sendError(res, error, "Something Went Wrong");
    }
  };
  static getlowonstockinventory = async (req, res) => {
    const { threshold } = req.query; 

    const thresholdNumber = parseInt(threshold, 10) || 5;

    const lowStockItems = await ItemsModel.find({
      quantity: { $lte: thresholdNumber },
    });

    sendResult(res, lowStockItems, "Low Stock Items Retrieved Successfully");
    try {
    } catch (error) {
      console.log(error);
      sendError(res, error, "Something Went Wrong");
    }
  };
}

export default inventoryController;
