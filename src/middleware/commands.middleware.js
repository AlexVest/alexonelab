const executor = require('../executor')
const logger = require('../config/logger')

module.exports = async (ctx, next) => {
  if (!ctx.text) return next()
  if (!ctx.text.startsWith('.') && !ctx.text.startsWith('/')) return next()

  ctx.text = ctx.text.substring(1)
  logger.info(`${ctx.senderId}: ${ctx.text}`)

  executor.execute(ctx.text, ctx).catch(e => {
    ctx.send(`Ошибка! ${e.message}`)
    logger.error(`${ctx.senderId}: ${e.message}`)
  })

  await next()
}