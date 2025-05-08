# Web Check

Web Check is a lightweight tool designed to measure the response time of websites. It pings the provided URLs, calculates the time taken to establish a connection, and displays the HTTP response status and time.

## Prerequisites

[Node.js 22](https://nodejs.org/) or the latest version installed on your system.

## How to Run?

To test the response time of `github.com`, `google.com`, and `facebook.com`, run:

```bash
 npm start github.com google.com facebook.com
```

or you can use node.js directly to run the script:

```bash
node --run start -- github.com google.com facebook.com
```

### Sample Output

```
Testing connection to github.com
Connected to github.com
Response status : 200
Response Time : 120ms

Testing connection to google.com
Connected to google.com
Response status : 200
Response Time : 95ms

Testing connection to facebook.com
Connected to facebook.com
Response status : 301
Response Time : 368ms
```

If a connection fails or times out, the tool will display an appropriate error message along with the elapsed time.

## Notes

- Ensure that the websites you test are accessible from your network.
- The script uses a default timeout of 3 seconds for each connection attempt.
