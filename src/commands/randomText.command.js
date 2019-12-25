const { Command } = require('@alexthvest/commands')
const puppeteer = require('puppeteer')

module.exports = class RandomTextCommand extends Command {
  patterns = ['text', 'текст']
  params = {
    text: [String]
  }
  
  async execute({ text }, ctx) {
    if (!text) return
    text = text.join(' ')
    
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    
    await page.goto('https://text.skynet.center/', { waitUntil: 'networkidle2' })
    await page.type('#editorjs > div', text)
    
    const [button] = await page.$x('//span[contains(., "Дополнить (Tab)")]');
    await button.click()
    
    await page.waitForXPath('//span[contains(., "Варианты (Tab)")]')
    
    const textarea = await page.$('#editorjs > div')
    const result = await textarea.evaluate(e => e.textContent)
    
    ctx.send(result)
    await browser.close()
  }
}