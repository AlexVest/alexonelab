const { Command } = require('@alexthvest/commands')
const puppeteer = require('puppeteer')
const fs = require('fs')

module.exports = class HtmlCompilerCommand extends Command {
  patterns = ['html']
  params = {
    html: [String]
  }
  
  async execute({ html }, ctx) {
    const date = Date.now()
    html = html.join(' ')
    
    const htmlPath = `${__dirname}/../../temp/${date}.html`
    const screenPath = `${__dirname}/../../temp/${date}.png`
    
    fs.writeFileSync(htmlPath, html)
    
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    
    await page.setViewport({ width: 1980, height: 1080 })
    
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle2' })
    await page.screenshot({ path: screenPath, fullPage: true })
    
    await browser.close()
    await ctx.sendPhotos(screenPath)
  }
}
