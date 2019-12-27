const User = require('../models/user.model')

class UserService {
  
  /**
   * Adds user to db
   * @param {number} userId
   * @param {object} params
   * @returns {Promise<Document>}
   */
  async add(userId, params = {}) {
    const user = new User({ _id: userId, ...params })
    return user.save()
  }
  
  /**
   * Gets user by id
   * @param {number} userId
   * @returns {Promise<Document>}
   */
  async getById(userId) {
    return User.findById(userId)
  }
  
  /**
   * Gets user and creates him if not exists
   * @param {number} userId
   * @param {object} params
   * @returns {Promise<Document>}
   */
  async getOrAdd(userId, params = {}) {
    return await this.getById(userId) || this.add(userId, params)
  }
}

module.exports = new UserService()