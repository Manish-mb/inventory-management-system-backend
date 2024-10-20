import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Defining Schema
const ordersSchema = new mongoose.Schema({
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'items',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      buyingprice: {
        type: Number,
        },
      cgst: {
        type: Number,
        required: true,
        default:0
      },
      sgst: {
        type: Number,
        required: true,
        default:0
      },
      igst: {
        type: Number,
        required: true,
        default:0
      },
    }
  ],
  cgst: {
    type: Number,
    required: true,
    default:0
  },
  sgst: {
    type: Number,
    required: true,
    default:0
  },
  igst: {
    type: Number,
    required: true,
    default:0
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerGST: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Model
const OrdersModel = mongoose.model("orders", ordersSchema);
// save
export const saveOrdersModel = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new OrdersModel(data);
      const saved_document = await doc.save();
      resolve(saved_document);
    } catch (error) {
      reject(error);
    }
  });
};
export const GetAllOrdersModel = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = OrdersModel.find().populate('items.item')
      resolve(doc);
    } catch (error) {
      reject(error);
    }
  });
};
export const GetOrderById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = OrdersModel.findById(id).populate('items.item')
      resolve(doc);
    } catch (error) {
      reject(error);
    }
  });
};
export const GetOrderByDateRange = (fromDate,toDate) => {
  return new Promise(async (resolve, reject) => {
    try {
       const startDate = new Date(fromDate);
       const endDate = new Date(toDate);
 
       if (endDate < startDate) {
         return reject(new Error("End date must be greater than or equal to start date"));
       }
 
       const docs = await OrdersModel.find({
         createdAt: { $gte: startDate, $lte: endDate },
       }).populate('items.item');
 
       resolve(docs);
    } catch (error) {
      reject(error);
    }
  });
};

export default OrdersModel;
