import https from "node:https";
import chalk from "chalk";

/*
 * Ping the websites
 * Remove http:// or https:// if present
 * Measure how long it takes to connect to websites
 */

function pingWebsite(url) {
  const hostname = url.replace(/^https?:\/\//, "");
  console.log(chalk.yellow.bold(`Testing connection to ${hostname}`));
  const startTime = Date.now();
  // handle the request from the user
  const req = https.get(`https://${hostname}`, (res) => {
    const { statusCode, headers } = res;
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    if (statusCode >= 300 && statusCode < 400 && headers.location) {
      console.log(chalk.blue(`Redirected to ${headers.location}`));
      pingWebsite(headers.location);
    } else {
      console.log(chalk.green.bold(`Connected to ${hostname}`));
      console.log(chalk.magenta(`Response status : ${statusCode}`));
      console.log(chalk.magenta(`Response Time : ${responseTime}ms`));
    }
    // Clean up the request
    res.resume();
  });

  // handle the event

  req.on("error", (err) => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    console.log(chalk.red(`Failed to connect to ${hostname}: ${err.message}`));
    console.log(chalk.red(`Time elapsed before failure ${responseTime}ms`));
    process.exit(1);
  });

  // Timeout for the request is 3 seconds

  req.setTimeout(3000, () => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    console.log(chalk.red(`Connection to ${hostname} timed out`));
    console.log(chalk.red(`Time elapsed before failure: ${responseTime}ms`));
  });
}

if (process.argv.length < 3) {
  console.log(
    chalk.red(
      "Usage: npm start website1 website2....\nExample: npm start github.com google.com facebook.com"
    )
  );
} else {
  const websites = process.argv.slice(2);
  websites.forEach((site) => {
    pingWebsite(site);
  });
}
