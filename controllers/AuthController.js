import { sendError, sendResult } from "../constant/HttpResponse.js";
import { checkUserModal, saveUserModal } from "../models/users.js";


class AuthController {
  //  save ITEM
  static register = async (req, res) => {
    console.log("save item called");
    try {
      const {
        username,
        password,
        
      } = req.body;
      if (username && password) {
        saveUserModal({
          username,
          password

 
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

  static login = async (req, res) => {
    console.log("save item called");
    try {
      const {
        username,
        password,
        
      } = req.body;
      if (username && password) {
        checkUserModal({
          username,
          password

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


}

export default AuthController;
