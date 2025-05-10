# Web Check

Web Check is a lightweight tool designed to measure the response time of websites.

## Prerequisites

[Node.js 22](https://nodejs.org/) or the latest version installed on your system.

## How to Run?

Install the required dependencies using npm:

```bash
npm install
```

To test the response time of `github.com`, `google.com`, and `amazon.com`, run:

```bash
 npm start github.com google.com amazon.com
```

or you can use node.js directly to run the script:

```bash
node --run start -- github.com google.com amazon.com

### Sample Output

```

Testing connection to github.com
Testing connection to google.com
Testing connection to amazon.com
Connected to github.com
Response status : 200
Response Time : 1034ms
Redirected to https://www.google.com/
Testing connection to www.google.com/
Connected to www.google.com/
Response status : 200
Response Time : 711ms
Redirected to https://www.amazon.com/
Testing connection to www.amazon.com/
Connected to www.amazon.com/
Response status : 200
Response Time : 1125ms

```

If a connection fails or times out, the tool will display an appropriate error message along with the elapsed time.

## Notes

- Ensure that the websites you test are accessible from your network.
- The script uses a default timeout of 3 seconds for each connection attempt.
```
