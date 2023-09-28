const puppeteer = require('puppeteer');

// Function to perform a login attempt
async function performLogin(username, password) {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

  // Navigate to the login page
  await page.goto('http://localhost:7000');

  // Fill in the login form with unique username and password
  await page.type('#username', username);
  await page.type('#password', password);

  // Click the login button
  await page.click('#submit')

  // Wait for the login process to complete
  await page.waitForSelector('.menu')

  // Check if login was successful (you'll need to adapt this to your specific website)
  const loginSuccessful = await page.evaluate(() => {
    return document.querySelector('.menu') !== null;
  });
  const metrics = await page.metrics();
  console.info(metrics);
  // Close the browser
  await browser.close();

  return loginSuccessful;
}

// Create an array of login tasks
const loginTasks = [];
const users = [{userName: 'Aku', password: 'Developer@292'}, {userName: 'dev_test1', password: 'Password1'},{userName: 'dev_test0', password: 'Password1'}, {userName: 'dev_test5', password: 'Password1'} ]

for (let i = 0; i < users.length; i++) {
  const username = users[i].userName;
  const password = users[i].password;

  loginTasks.push(performLogin(username, password));
}

let startTime = performance.now()
Promise.all(loginTasks)
    .then((results) =>{
        const endTime = performance.now();
        console.log(results)
        const totalDuration = endTime - startTime;
        console.log("this is the total time: ", totalDuration)
    })
    .catch((error)=>{
        console.log(error)
    })