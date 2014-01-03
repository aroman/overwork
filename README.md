# overwork

"These pretzels are making me thirsty."

## A quick note

Don't worry that running the server gives errors like
```
Multipart body parsing will be disabled by default in future versions. To enable, use `middleware:multipart` configuration.
connect.multipart() will be removed in connect 3.0
visit https://github.com/senchalabs/connect/wiki/Connect-3.0 for alternatives
connect.limit() will be removed in connect 3.0
```
They're harmless and Kraken is [fixing them imminently](https://github.com/paypal/kraken-js/pull/54).

## How do I run this?

1. Clone & enter the repo: `git clone git@github.com:aroman/overwork.git && cd overwork`

2. Make sure Node.js is installed:`brew install node` || `sudo apt-get install nodejs`

3. Install server-side dependencies: `npm install`

4. Start the server: `npm start`

5. Check out http://localhost:8000