const { VK } = require('vk-io')
const config = require('./config')
const executor = require('./executor')

const vk = new VK({ token: config.TOKEN })

vk.updates.on('message', async (ctx, next) => {
  if (!ctx.text) return next()
  if (!ctx.text.startsWith('.') && !ctx.text.startsWith('/'))
    return next()
  
  ctx.text = ctx.text.substring(1)
  executor.execute(ctx.text, ctx).catch(e => ctx.send(`[ERROR] ${e.message}`))
  
  await next()
})

vk.updates.start()
  .then(() => console.log('[INFO] Bot is working...'))
  .catch(console.error)