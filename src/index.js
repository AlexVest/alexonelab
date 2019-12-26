const { VK } = require('vk-io')
const config = require('./config')
const executor = require('./executor')
const vk = new VK({ token: config.TOKEN })

const User = require('./models/user.model')

vk.updates.on('message', async (ctx, next) => {
  let user = await User.findById(ctx.senderId)

  if (!user) {
    user = new User({ _id: ctx.senderId })
    user.save()
  }

  ctx.user = user
  await next()
})

vk.updates.on('message', async (ctx, next) => {
  if (!ctx.text) return next()
  if (!ctx.text.startsWith('.') && !ctx.text.startsWith('/')) return next()

  ctx.text = ctx.text.substring(1)

  executor.execute(ctx.text, ctx).catch(e => {
    ctx.send(`[ERROR] ${e.message}`)
    console.error(e)
  })

  await next()
})

vk.updates.start()
  .then(() => console.log('[INFO] Bot is working...'))
  .catch(console.error)