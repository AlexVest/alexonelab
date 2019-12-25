module.exports = async (ctx, next) => {
  const empty = Object.values(ctx.args).find(p => Array.isArray(p))
  if (empty && empty.length === 0) return
  
  await next()
}