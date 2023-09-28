var puppeteer = require('puppeteer');

class browserManager {
    constructor(){
        this.browser = null;
    }
    async openBrowser(mode=false){
        const browser = await puppeteer.launch({headless: mode})
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

const { exec } = require('child_process');

const { spawn } = require('child_process');
const child = spawn('dir')
// console.log("child subprocess:",child)
// const child = spawn('find', ['.', '-type', 'f']);
// child.on('exit', function(code, sig){
//     console.log(`exit code ${code} + ${sig}+${sig}`)
// })
// child.on('error', (err)=>{
//     console.log('fail to start the subprocess', err)
// })
// child.stdout.on('data', (data) => {
//     console.log(`child stdout:\n${data}`);
//   });

//   child.stderr.on('data', (data) => {
//     console.error(`child stderr:\n${data}`);
//   });
// child.on('hello', console.log('hello event'))

// const child = spawn('wc'); // word count utility
// process.stdin.pipe(child.stdin) //process.stdin- pareent preoces and the child process
// // so then the input data form the parent is pass to the child input

child.stdout.on('data', (data) =>{
    console.log(`child stdout: \n ${data}`)
})
// child.disconnect();




class BrowserManager {
    constructor(){
        this.browserProcess = null;
    }

    async OpenBrowser(url) {
        if(!this.browserProcess){
            this.browserProcess = exec(`start ${url}`, (error, stdout, stderr) =>{
                if(error){
                    console.log("Error:", error );
                }
                console.log("Not Error: browser is open " );
            })
        }

    }

    async closeBrowser() {
        if(this.browserProcess) {
            // this.browserProcess.kill();       
            this.browserProcess = null;
            console.log('close successfully')
        }
    }

    // isBowserOpen(){
    
        // return this.browserProcess ? true : false;
        // console.log(this.browserProcess)
        // return Boolean(this.browserProcess)
    // }

    
}

(async ()=>{
    const browserManager = new BrowserManager();
    try{
        await browserManager.OpenBrowser('https://www.google.com/')
        console.log('browser is open')
        // console.log('Is browser Open?', browserManager.isBowserOpen())
        
    } catch(error){
        console.log(error)
    }
    await browserManager.closeBrowser();
})();

