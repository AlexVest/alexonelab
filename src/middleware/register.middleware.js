const UserService = require('../services/user.service')

module.exports = async (ctx, next) => {
  if (ctx.senderId < 0) return // skips bots
  ctx.user = await UserService.getOrAdd(ctx.senderId)
  
  await next()
}