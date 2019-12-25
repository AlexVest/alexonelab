module.exports = async (ctx, next) => {
  const param = Object.values(ctx.command.params).find(p => Array.isArray(p))
  if (param.length === 0) return
  await next()
}