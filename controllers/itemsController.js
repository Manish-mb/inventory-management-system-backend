import { sendError, sendResult } from "../constant/HttpResponse.js";
import {
  getAllItemsModel,
  getItemByParameterModel,
  saveItemModal,
  updateItemModal,
  updateItemQuantityModal,
} from "../models/Items.js";

class ItemsController {
  //  save ITEM
  static saveItem = async (req, res) => {
    console.log("save item called");
    try {
      const {
        name,
        AttachmentID,
        description,
        sku,
        quantity,
        cgst,
        sgst,
        igst,
        CurruntPrice,
      } = req.body;
      if (name) {
        saveItemModal({
          name,
          AttachmentID,
          description,
          sku,
          quantity,
          cgst,
          sgst,
          igst,
          CurruntPrice,
        })
          .then((result) => {
            sendResult(res, result, "Data Saved");
          })
          .catch((error) => {
            console.log(error);
            sendError(res, error, "Something Went Wrong");
          });
      } else {
        sendError(res, "name is required parameter", "Something Went Wrong");
      }
    } catch (error) {
      console.log(error);
      sendError(res, error, "Something Went Wrong");
    }
  };
  static updateItemquantity = async (req, res) => {
    console.log("save item called");
    try {
      const {
        _id,
        quantity,
        operation
        } = req.body;
      if (_id) {
        updateItemQuantityModal({
          _id,
          quantity,
          operation
        })
          .then((result) => {
            sendResult(res, result, "Data Saved");
          })
          .catch((error) => {
            console.log(error);
            sendError(res, error, "Something Went Wrong");
          });
      } else {
        sendError(res, "name is required parameter", "Something Went Wrong");
      }
    } catch (error) {
      console.log(error);
      sendError(res, error, "Something Went Wrong");
    }
  };
  static EditItem = async (req, res) => {
    console.log("save item called");
    try {
      const {
        _id,
        name,
        AttachmentID,
        description,
        sku,
        quantity,
        cgst,
        sgst,
        igst,
        CurruntPrice,
      } = req.body;
      if (name) {
        updateItemModal(_id, {
          _id,
          name,
          AttachmentID,
          description,
          sku,
          quantity,
          cgst,
          sgst,
          igst,
          CurruntPrice,
        })
          .then((result) => {
            sendResult(res, result, "Data Saved");
          })
          .catch((error) => {
            console.log(error);
            sendError(res, error, "Something Went Wrong");
          });
      } else {
        sendError(res, "name is required parameter", "Something Went Wrong");
      }
    } catch (error) {
      console.log(error);
      sendError(res, error, "Something Went Wrong");
    }
  };
  static getAllItems = async (req, res) => {
    console.log("get all called");
    try {
      getAllItemsModel()
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
  static getItemsByParameter = async (req, res) => {
    console.log("getItemsByParameter called");
    const { _id, name, sku, quantity, cgst, sgst, igst, BuyingPrice } =
      req.query;
    try {
      getItemByParameterModel({
        _id,
        name,
        sku,
        quantity,
        cgst,
        sgst,
        igst,
        BuyingPrice,
      })
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
}

export default ItemsController;
