const designation = require('../../models/designation')
const location = require('../../models/location')
const users = require('../../models/user')


/**get distination */
const getDesignation = async (req, res) => {
    try {
      const fulldesignation = await designation.find();
      if (fulldesignation) {
        res.status(200).json({
          success: true,
          message: "Designation fetched successfully",
          data: fulldesignation,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Designation not found",
        });
      }
    } catch (err) {
      res.status(404).json({
        success: false,
        message: "Designation not found",
      });
    }
  };

  /**getlocation */
const getLocation = async (req, res) => {
    try {
      const fullLocation = await location.find();
      if (fullLocation) {
        res.status(200).json({
          success: true,
          message: "location fetched successfully",
          data: fullLocation,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "location not found",
        });
      }
    } catch (err) {
      res.status(404).json({
        success: false,
        message: "location not found",
      });
    }
  };

  const getUsers = async (req, res) => {
    try {
      const user = await users
        .find({ delateStatus: false })
        .sort({ createdAt: -1 });
      if (user && user.length > 0) {
        res.status(200).json({
          success: true,
          message: "users fetched successfully",
          data: user,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "no users found",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({
        success: false,
        message: "users fetch failed",
      });
    }
  };

  /**get Single users */
  const getsingleUser = async (req, res) => {
    try {
      const id = req.query.userId;
      if (id) {
        const user = await users.findOne({ _id: id });
        if (user) {
          res.status(200).json({
            success: true,
            message: "user fetched successfully",
            data: user,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "user not found",
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({
        success: false,
        message: "user fetch failed",
      });
    }
  };

  /**get deleted Users */
  const getdeletedUsers = async (req, res) => {
    try {
      const deleteduser = await users.find({ delateStatus: true });
      if (deleteduser) {
        res.status(200).json({
          success: true,
          message: "deleted user found",
          data: deleteduser,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "user not found",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(404).json({
        success: false,
        message: "user delete failed",
      });
    }
  };

  module.exports ={getDesignation,getLocation,getUsers,getsingleUser,getdeletedUsers}