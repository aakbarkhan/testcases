var puppeteer = require('puppeteer');

(async ()=>{
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    try {
        await page.goto('http://localhost:7000');
        // fill the username and password in the id field
        const cookeSelector = '#accept_cookies';
        await page.waitForSelector(cookeSelector);
        console.log(cookeSelector);

        await page.click(cookeSelector)
        await new Promise(r => setTimeout(r, 3000))

        await page.type('#username', 'Aku');
        await page.type('#password', 'Developer@292')

        // click the login btn
        await page.click('#submit')

        
        const checkNotPass = await page.evaluate(() =>{
            return document.querySelector('.container') !=null;
        })
        console.log(checkNotPass, 'checkNotPass') 

        if(checkNotPass){
            console.log('wrong username/password, please try again! ')
        } else {
            // wait for page to transition to the dashboard, then find the element in the dashboard
            await page.waitForSelector('.menu')
    
            const loginSuccess = await page.evaluate(()=>{
                return document.querySelector('.menu') != null;
            })
            console.log(loginSuccess, 'hello user')
            await new Promise(r => setTimeout(r, 10000))
            if(loginSuccess){
                const cookies = await page.cookies();
                console.log('User succesfully login 💯. from the home page, checkin', cookies);
            } else {
                console.log('Login failed.  😢')
            }
        }
    } catch(err){
        console.log(err)
    }
    await browser.close();
})();