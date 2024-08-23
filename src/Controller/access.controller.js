"use strict";

class AccessController {
  signUp = async (req, res, next) => {
    try {
      console.log("[P]::signUp", req.body);
      return res.status(200).json({
        // 200: OK
        // 201: Created
        message: "Sign up successfully",
      });
    } catch (error) {
      console.error("Error in AccessController -> signUp", error);
    }
  };
}

module.exports = new AccessController();
