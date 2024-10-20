import mongoose from "mongoose";

// Defining Schema
const AttachmentSchema  = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  fileData: {
    type: Buffer, // Buffer type to store binary data (the actual file)
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Model
const AttachmentsModel = mongoose.model("Attachments", AttachmentSchema );

export const saveAttachmentModal = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new AttachmentsModel(data);
      const saved_document = await doc.save();
      resolve(saved_document);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllAttachmentsModel = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = AttachmentsModel.find();
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export const getAttachmentsByIDModel = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const docs = AttachmentsModel.findById(id);
      resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};
export default AttachmentsModel;
