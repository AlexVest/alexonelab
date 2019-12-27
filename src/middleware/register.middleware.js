const User = require('../models/user.model')

module.exports = async (ctx, next) => {
  if (ctx.senderId < 0) return // skips bots
  let user = await User.findById(ctx.senderId)
  
  if (!user) {
    user = new User({ _id: ctx.senderId })
    user.save()
  }
  
  ctx.user = user
  await next()
}