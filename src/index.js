const { VK } = require('vk-io')
const { Executor, Command } = require('@alexthvest/commands')
const config = require('./config')

class HelloCommand extends Command {
  patterns = ['hello']
  
  execute(args, ctx) {
    ctx.send('Hello!')
  }
}

const vk = new VK({ token: config.TOKEN })
const executor = new Executor({
  commands: [new HelloCommand()]
})

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