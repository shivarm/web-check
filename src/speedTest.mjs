import http from "node:http";

/*
 * Ping the websites
 * Remove http:// or https:// if present
 * Measure how long it takes to connect to websites
 */

function pingWebsite(url) {
  const hostname = url.replace(/^https?:\/\//, "");
  console.log(`Testing connection to ${hostname}`);
  const startTime = Date.now();
  // handle the request from the user
  const req = http.get(`http:///${hostname}`, (res) => {
    const { statusCode } = res;
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    console.log(`Connected to ${hostname}`);
    console.log(`Response status : ${statusCode}`);
    console.log(`Response Time : ${responseTime}ms`);

    // Clean up the request
    res.resume();
  });

  // handle the event

  req.on("error", (err) => {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    console.log(`Failed to connect to ${hostname}: ${err.message}`);
    console.log(`Time elapsed before failure ${responseTime}ms`);
  });

  // Timeout for the request is 3 seconds

  req.setTimeout(3000, () => {
    const responseTime = endTime - startTime;
    console.log(`Connect to ${hostname} time out`);
    console.log(`Time elapsed before failure ${responseTime}ms`);
  });
}

if (process.argv.length < 3) {
  console.log(
    "Usage: node speedTest.mjs website1 website2....\nExample: node speedTest.mjs github.com google.com"
  );
} else {
  const websites = process.argv.slice(2);
  websites.forEach((site) => {
    pingWebsite(site);
  });
}