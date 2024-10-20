import mongoose from "mongoose";
import AttachmentsModel from "./attachments.js";

// Defining Schema
const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  AttachmentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attachments",
    default: null,
  },
  description: {
    type: String,
  },
  sku: {
    type: String,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  cgst: {
    type: Number,
    required: true,
    default: 0,
  },
  sgst: {
    type: Number,
    required: true,
    default: 0,
  },
  igst: {
    type: Number,
    required: true,
    default: 0,
  },
  CurruntPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Model
const ItemsModel = mongoose.model("items", itemsSchema);

export const saveItemModal = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new ItemsModel(data);
      const saved_document = await doc.save();
      resolve(saved_document);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateItemModal = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedDocument = await ItemsModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      if (!updatedDocument) {
        return reject(new Error("Item not found"));
      }
      resolve(updatedDocument);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateItemQuantityModal = (id, quantity, operation) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Determine the updated quantity based on the operation
      const update = operation === 'add' 
        ? { $inc: { quantity: quantity } } // Increment quantity
        : operation === 'remove' 
        ? { $inc: { quantity: -quantity } } // Decrement quantity
        : null;

      if (!update) {
        return reject(new Error("Invalid operation. Use 'add' or 'remove'."));
      }

      // Update the item quantity
      const updatedDocument = await ItemsModel.findByIdAndUpdate(id, update, {
        new: true, // Return the updated document
        runValidators: true, // Validate the data against the schema
      });

      // Check if the document was found and updated
      if (!updatedDocument) {
        return reject(new Error("Item not found"));
      }

      resolve(updatedDocument);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllItemsModel = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = ItemsModel.find().populate({
        path: "attachments",
        model: AttachmentsModel,
      });
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export const getItemByParameterModel = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = ItemsModel.find(data).populate({
        path: "attachments",
        model: AttachmentsModel,
      });
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export default ItemsModel;
