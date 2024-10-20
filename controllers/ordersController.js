import { sendError, sendResult } from "../constant/HttpResponse.js";
import { updateItemQuantityModal } from "../models/Items.js";
import OrdersModel, {
  GetAllOrdersModel,
  GetOrderById,
  saveOrdersModel,
} from "../models/Orders.js";
import PDFDocument from 'pdfkit';

class OrdersController {
  //  save Order
  static saveOrder = async (req, res) => {
    console.log("save Order called");
    try {
      const {
        items,
        cgst,
        sgst,
        igst,
        totalAmount,
        customerName,
        customerGST,
      } = req.body;
      if (items && totalAmount && customerName) {
        saveOrdersModel({
          items,
          cgst,
          sgst,
          igst,
          totalAmount,
          customerName,
          customerGST,
        })
          .then((result) => {
            items?.map((item) => {
              updateItemQuantityModal(item.item, item.quantity, "remove");
            });
            sendResult(res, result, "Data Saved");
          })
          .catch((error) => {
            sendError(res, error, "Something Went Wrong");
          });
      } else {
        sendError(
          res,
          "items,totalAmount,customerName are required parameters",
          "Something Went Wrong"
        );
      }
    } catch (error) {
      sendError(res, error, "Something Went Wrong");
    }
  };

  static getAllOrder = async (req, res) => {
    try {
      console.log("getAllOrders called");
      
      GetAllOrdersModel().then((result) => {
        sendResult(res, result, "Data Saved");
      }).catch((error) => {
        console.log(error);
        sendError(res, error, "Something Went Wrong");
      });
    } catch (error) {
      console.log(error);
      sendError(res, error, "Something Went Wrong2");
    }
  };

  static getOrderById = async (req, res) => {
    try {
      const { _id } = req.query;
      GetOrderById(_id)
        .then((result) => {
          sendResult(res, result, "Data Saved");
        })
        .catch((error) => {
          sendError(res, error, "Something Went Wrong");
        });
    } catch (error) {
      console.log(error);
      sendError(res, error, "Something Went Wrong2");
    }
  };
  static getOrderByDateRange = async (req, res) => {
    try {
      const { FromDate, ToDate } = req.query;
      GetOrderByDateRange(FromDate, ToDate)
        .then((result) => {
          sendResult(res, result, "Data Saved");
        })
        .catch((error) => {
          sendError(res, error, "Something Went Wrong");
        });
    } catch (error) {
      console.log(error);
      sendError(res, error, "Something Went Wrong2");
    }
  };
  static getOrderInvoice = async (req, res) => {
    try {

      const { _id } = req.query;

      // Fetch the order by ID
      const order = await OrdersModel.findById(_id).populate("items.item");

      if (!order) {
        return sendError(res, "Order not found", "Failed to generate invoice");
      }

      // Create a new PDF document
      const doc = new PDFDocument();

      // Create a buffer to hold the PDF data
      let buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", async () => {
        const pdfData = Buffer.concat(buffers);
        const base64 = pdfData.toString("base64");

        // Send the Base64 PDF in response
        sendResult(res, { invoice: base64 }, "Invoice generated successfully");
      });

      // Add content to the PDF
      doc.fontSize(20).text(`Invoice`, { align: "center" });
      doc.moveDown();

      // Add customer details
      doc.fontSize(14).text(`Customer Name: ${order.customerName}`);
      if (order.customerGST) {
        doc.text(`Customer GST: ${order.customerGST}`);
      }
      doc.moveDown();

      // Add order details
      doc.fontSize(16).text("Order Details:");
      order.items.forEach((item) => {
        doc.text(`Item: ${item.item.name}`); // Adjust property to get item name
        doc.text(`Quantity: ${item.quantity}`);
        doc.text(`Price: ${item.price}`);
        doc.text(`CGST: ${item.cgst}`);
        doc.text(`SGST: ${item.sgst}`);
        doc.text(`IGST: ${item.igst}`);
        doc.moveDown();
      });

      // Add totals
      doc.text(`Total Amount: ${order.totalAmount}`);
      doc.text(`Created At: ${order.createdAt.toISOString()}`);

      // Finalize the PDF
      doc.end();
    } catch (error) {
      console.log(error);
      sendError(res, error, "Something Went Wrong2");
    }
  };
}

export default OrdersController;
