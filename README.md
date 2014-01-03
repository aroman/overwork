# overwork

"These pretzels are making me thirsty."

### How do I run this?

1. Clone & enter the repo: `git clone git@github.com:aroman/overwork.git && cd overwork`

2. Make sure Node.js is installed: `brew install node` || `sudo apt-get install nodejs`

3. Install server-side dependencies: `npm install`

4. Start the server: `npm start`

5. Check out [localhost:8000](http://localhost:8000)

### How can I make the server auto-restart when the server code changes?

1. Install nodemon globally: `npm -g install nodemon`

2. Run nodemon: `nodemon -i .build -w config npm start` (if you don't ignore `.build/` it will reload when ANY file changes)

### Yo generators

I stole these from [the README for yo-generator-kraken](https://github.com/paypal/generator-kraken#api) (we use this).

`yo kraken`  
Creates a new kraken application.

`yo kraken:page myPage`  
Generates a new controller, model, content bundle, and template named *myPage*.

`yo kraken:controller myController`  
Generates a new controller named *myController*.

`yo kraken:model myModel`  
Generates a new model named *myModel*.

`yo kraken:template myTemplate`  
Generates a new template named *myTemplate*.

`yo kraken:locale myFile myCountry myLang`  
Generates a new content bundle named *myFile*. Both *myCountry* and *myLang* are optional.


### Coding style

4-space indentations ALL the things. (CSS/LESS, HTML/Dust, JavaScript)

### About those warnings...

Don't worry that running the server gives warnings like
```
Multipart body parsing will be disabled by default in future versions. To enable, use `middleware:multipart` configuration.
connect.multipart() will be removed in connect 3.0
visit https://github.com/senchalabs/connect/wiki/Connect-3.0 for alternatives
connect.limit() will be removed in connect 3.0
```
They're harmless and Kraken is [fixing them imminently](https://github.com/paypal/kraken-js/pull/54).
