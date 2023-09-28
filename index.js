var puppeteer = require('puppeteer');

(async ()=>{
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    // got to the page url
    
    // set screeen size
    // await page.setViewport({width: 1080, height:1024})

    // type into search box.
    // await page.type('.search-box__input', 'automate',  {
    //     delay: 300
    // });
    // accepting cookies.
    // try {
    //     await page.goto('http://localhost:7000');

    //     const cookeSelector = '#accept_cookies';
    //     await page.waitForSelector(cookeSelector);
    //     console.log(cookeSelector);

    //     await page.click(cookeSelector)
    //     await new Promise(r => setTimeout(r, 1000))
    //     const cookies = await page.cookies();
    //     // console.log(cookies)
    //     if(cookies.length > 0){
    //         console.log('we have found the cookies 😄.')
    //     } else {
    //         console.log('no cookies on this page')
    //     }

    // } catch(err) {
    //     console.log('error on accepting cookies.')
    // }


    //invalid route/url/path, the check for the 404 page.
    // try {
    //     await page.goto('http://localhost:7000/time');
    //     await new Promise(r => setTimeout(r, 1000))

    //     const notFound = '.links>h2';
    //     await page.waitForSelector(notFound);

    //     const notfoundSelector = await page.$(notFound)
    //     const not = await notfoundSelector?.evaluate(e =>e.textContent)
    //     console.log(not,"not")
    //     if(not) {
    //         // select the tag
    //         const mainPageTag = '.links>a';
    //         // waiting for the tag to appear
    //         await page.waitForSelector(mainPageTag);
    //         await page.click(mainPageTag)
    //         console.log('going to the main page successful 😄.')
    //         await new Promise(r => setTimeout(r, 1000))
    //     }
    // } catch(err) {
    //     console.log(err)
    // }

    // checking for the login successful or not
    try {
        await page.goto('http://localhost:7000');
        // fill the username and password in the id field
        await new Promise(r => setTimeout(r, 1000))

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
            await new Promise(r => setTimeout(r, 1000))
            if(loginSuccess){
                const cookies = await page.cookies();
                console.log('User succesfully login 💯. from the home page, checkin');

            } else {
                console.log('Login failed.  😢')
            }
        }
    } catch(err){
        console.log(err)
    }
// checking if the user is still logged in 
    try {
        await page.goto('http://localhost:7000/logged_in');
        const cookies = await page.cookies();
        await new Promise(r => setTimeout(r, 10000))
        console.log("in the logged_in route ")
        if(cookies[0].name === '_SCsession'){
            console.log('session is present')
            
        } else {
            await page.goto('http://localhost:7000')
        }

    }catch(err){
        console.log(err);
    }

    // click the setting button.
    try {
        await page.goto('http://localhost:7000/logged_in');
        
        await page.click('.img_setting');
        await page.waitForSelector('#userAddress')
        await new Promise(r => setTimeout(r, 1000))
        const address = await page.evaluate(()=>{
            return document.querySelector('#userAddress') != null;
        })
        console.log(address)
        if(address){
            //update comment and address.
            // select all the text content make it empty, both for comment and address.
           
        //    await page.evaluate(()=>{
        //     const addressInput = document.querySelector('#userAddress');
        //     const commentInput = document.querySelector('#comments');
        //     addressInput.value = "";
        //     commentInput.value = "";
        // })
       
        await new Promise(r => setTimeout(r, 1000))
        
            await page.type('#userAddress', "Hello ");
            await page.type('#comments', 'this ');
            await new Promise(r => setTimeout(r, 2000))
            await page.click('#submit');
            await new Promise(r => setTimeout(r, 2000))
            await page.click('a')
            await new Promise(r => setTimeout(r, 2000))
            await page.waitForSelector('.menu')
            // await page.click('.menu>a:nth-child(2)')
            const logoutElement = '.menu > p:nth-child(2) > a:nth-child(1)';
            await page.click(logoutElement, console.log('logout sucessful'))
            await new Promise(r => setTimeout(r, 2000))

        }
    } catch(err){
        console.log(err)
    }

    

    
    // Wait and click on first result
    // const searchResultSelector = '.search-box__link';

    // await page.waitForSelector(searchResultSelector);

    // await page.click(searchResultSelector);

    // Locate the full title with a unique string
    // const textSelector = await page.waitForSelector(
        // 'text/Password Manager'
    //   );
    //   const divselector = await page.$('div')

    // const fullTitle = await textSelector?.evaluate(el => el.textContent);
    // const innerHtml = await divselector?.evaluate(el => el.innerHTML);


    // Print the full title
    // console.log('The title of this blog post is "%s".', fullTitle);
    // console.log('The inner html i "%s".', innerHtml);
    

    await browser.close();
 
})();