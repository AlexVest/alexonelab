const { VK } = require('vk-io')
const config = require('./config')

const vk = new VK({ token: config.TOKEN })

vk.updates.on('message', require('./middleware/register.middleware'))
vk.updates.on('message', require('./middleware/commands.middleware'))

vk.updates.start()
  .then(() => console.log('[INFO] Bot is working...'))
  .catch(console.error)