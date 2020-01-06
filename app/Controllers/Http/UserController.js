"use strict";
const User = use("App/Models/User");

class UserController {
  async index() {
    try {
      let user = await User.query().select("email").fetch();

      return user;
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserController;
