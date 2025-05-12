import https from "node:https";
import chalk from "chalk";

/*
 * Ping the websites
 * Remove http:// or https:// if present
 * Measure how long it takes to connect to websites
 */

function pingWebsite(url) {
  return new Promise((resolve, reject) => {
    const hostname = url.replace(/^https?:\/\//, "");
    console.log(chalk.yellow.bold(`Testing connection to ${hostname}`));
    const startTime = Date.now();

    const req = https.get(`https://${hostname}`, async (res) => {
      const { statusCode, headers } = res;
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      if (statusCode >= 300 && statusCode < 400 && headers.location) {
        console.log(chalk.blue(`Redirected to ${headers.location}`));
        const redirectedResponse = await pingWebsite(headers.location);
        resolve(redirectedResponse);
      } else {
        console.log(chalk.green.bold(`Connected to ${hostname}`));
        console.log(chalk.magenta(`Response status : ${statusCode}`));
        console.log(chalk.magenta(`Response Time : ${responseTime}ms`));

        // Retrieve SSL certificate details
        const cert = res.socket.getPeerCertificate();
        if (cert) {
          console.log(chalk.green(`SSL Certificate Details for ${hostname}:`));
          console.log(chalk.cyan(`Issuer: ${cert.issuer.O || "N/A"}`));
          console.log(chalk.cyan(`Valid From: ${cert.valid_from}`));
          console.log(chalk.cyan(`Valid To: ${cert.valid_to}`));
          console.log(chalk.cyan(`Subject: ${cert.subject.O || "N/A"}`));
        } else {
          console.log(chalk.red(`No SSL certificate found for ${hostname}`));
        }
        resolve();  
      }

      res.resume(); // Clean up the response
    });

    req.on("error", (err) => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      console.log(chalk.red(`Failed to connect to ${hostname}: ${err.message}`));
      console.log(chalk.red(`Time elapsed before failure: ${responseTime}ms`));
      reject(err);  
    });

    req.setTimeout(3000, () => {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      console.log(chalk.red(`Connection to ${hostname} timed out`));
      console.log(chalk.red(`Time elapsed before failure: ${responseTime}ms`));
      req.destroy(); // Destroy the request to free resources
      reject(new Error("Request timed out")); // Reject the promise on timeout
    });
  });
}

async function main() {
  if (process.argv.length < 3) {
    console.log(
      chalk.red(
        "Usage: npm start website1 website2....\nExample: npm start github.com google.com facebook.com"
      )
    );
    return;
  }

  const websites = process.argv.slice(2);

  for (const site of websites) {
    try {
      await pingWebsite(site); // Wait for each website to complete
    } catch (err) {
      console.log(chalk.red(`Error processing ${site}: ${err.message}`));
    }
  }
  console.log(chalk.green.bold("All websites processed."));
}

main();
