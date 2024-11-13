import mongoose from "mongoose";
import AttachmentsModel from "./attachments.js";

// Defining Schema
const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Model
const ItemsModel = mongoose.model("users", usersSchema);

export const saveUserModal = (data) => {
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


export const checkUserModal = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const doc =  ItemsModel.find(data);
        resolve(doc);
      } catch (error) {
        reject(error);
      }
    });
  };