const { Converter } = require('@alexthvest/commands')
const User = require('../models/user.model')

module.exports = class UserConverter extends Converter {
  type = User

  /**
   * 
   * @param {string} value 
   * @returns {number | null}
   */
  _getIdFromMention(value) {
    const match = value.match(/\[id(.*)\|.*\]/)
    return match ? match[1] : null
  }
  
  /**
   *
   * @param {string} value
   * @param ctx
   * @returns {number | null}
   */
  async _tryGetId(value, ctx) {
    const numberId = parseInt(value)
    if (numberId) return numberId
    
    const mentionId = this._getIdFromMention(value)
    if (mentionId) return mentionId
  
    const users = await ctx.vk.api.users.get({ user_ids: value })
    if (users.length) return users[0].id
    
    return null
  }

  /**
   * 
   * @param {string} value 
   * @param {*} ctx 
   */
  async convert(value, ctx) {
    const response = {
      error: 'Такого пользователя не существует.',
      value: null
    }

    const userId = await this._tryGetId(value, ctx)
    if (!userId) return response
    
    response.value = await User.findById(userId)
    if (response.value) response.error = null

    return response
  }
}