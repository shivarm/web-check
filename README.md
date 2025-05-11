# Web Check

Web Check is a lightweight tool designed to measure the response time and SSL Certificate Details of websites.

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
```

### Sample Output

```
Testing connection to github.com
Connected to github.com
Response status : 200
Response Time : 765ms
SSL Certificate Details for github.com:
Issuer: Sectigo Limited
Valid From: Feb  5 00:00:00 2025 GMT
Valid To: Feb  5 23:59:59 2026 GMT
Subject: N/A
Testing connection to google.com
Redirected to https://www.google.com/
Testing connection to www.google.com/
Connected to www.google.com/
Response status : 200
Response Time : 851ms
SSL Certificate Details for www.google.com/:
Issuer: Google Trust Services
Valid From: Apr 21 08:42:35 2025 GMT
Valid To: Jul 14 08:42:34 2025 GMT
Subject: N/A
Testing connection to amazon.com
Redirected to https://www.amazon.com/
Testing connection to www.amazon.com/
Connected to www.amazon.com/
Response status : 200
Response Time : 915ms
SSL Certificate Details for www.amazon.com/:
Issuer: DigiCert Inc
Valid From: Sep 13 00:00:00 2024 GMT
Valid To: Aug 23 23:59:59 2025 GMT
Subject: N/A
All websites processed.
```

If a connection fails or times out, the tool will display an appropriate error message along with the elapsed time.

## Notes

- Ensure that the websites you test are accessible from your network.
- The script uses a default timeout of 3 seconds for each connection attempt.
