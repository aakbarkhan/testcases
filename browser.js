var puppeteer = require('puppeteer');

class browserManager {
    constructor(){
        this.browser = null;
    }
    async openBrowser(){
        const browser = await puppeteer.launch({headless: false})
        if(!this.browser){
            this.browser = await browser.newPage()
            // this.browser = await page.goto(url)
            console.log('in the browser new page is open')
        }
    }
}


const browser = new browserManager();
(async ()=>{
    await browser.openBrowser()
    
})();
   
