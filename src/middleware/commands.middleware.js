const executor = require('../executor')

module.exports = async (ctx, next) => {
  if (!ctx.text) return next()
  if (!ctx.text.startsWith('.') && !ctx.text.startsWith('/')) return next()
  
  ctx.text = ctx.text.substring(1)
  
  executor.execute(ctx.text, ctx).catch(e => {
    ctx.send(`[ERROR] ${e.message}`)
    console.error(e)
  })
  
  await next()
}