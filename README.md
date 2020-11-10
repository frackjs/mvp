# FrackJS

This is the minimum viable product (mvp) repo for FrackJS.

### What is FrackJS

FrackJS is a tool for bridging the gap between your frontend code and your backend code. It will read through your Node.js functions and generate the routes (on server) and the fetch functions (on client).

For example, if you have something like this on the *backend*:

```js
const db = require('./db.js')
const products = {}

products.getOne = function (id) {
  return db.products.find((p) => p.id === id)
}

products.getMany = function (params) {
  return db.products
}

module.exports = products
```

You will be able to directly call these functions on the *frontend*:

```js
const productsData = await products.getMany()
```

Basically, this is a tool that abstracts away the HTTP fetch and routing for you.

To illustrate it visually.

![](https://github.com/frackjs/mvp/blob/master/README-assets/diagram-1.png)

When FrackJS is used:

![](https://github.com/frackjs/mvp/blob/master/README-assets/diagram-2.png)

The development experience would be like:

![](https://github.com/frackjs/mvp/blob/master/README-assets/diagram-3.png)

### Try it out

First, clone this repo into your computer, and install the dependencies:

```cmd
git clone https://github.com/frackjs/mvp.git
cd mvp
npm install
```

Create a React app inside the folder:

```cmd
npx create-react-app client
```

Set up a proxy server inside the *React app's* `package.json`:
```js
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:3001", // ADD THIS
```

The repo comes with some sample server-side functions in the `/actions` folder, there's a `products.js` file there that contains some `products` related functions.

You can run the server to start generating the corresponding routes and fetchers.

```
npm run serve
```

Whenever the `/actions/products.js` file is changed, the generator will produce the new versions of routes and fetchers. By the default, the routes will be created in `/actionsRoutes` and the fetchers will be placed in `/client/src/actions`. And by default FrackJS will look for the source functions from the `/actions` folder in the root directory.

We have to import the generated routes file in `server.js`:

```js
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const productsRoutes = require('./actionsRoutes/productsRoutes') // ADD

const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())

productsRoutes(app) // ADD
...
```

Open a new console and start the React app as well:

```cmd
cd mvp/client
npm start
```

Now in the React code, you should be able to *import* and *call* the backend `products` functions as if they're in the frontend:

```js
import { useState, useEffect } from 'react';
import products from './actions/products'; // import
function App() {

  const [ title, setTitle ] = useState('')
  const [ productList, setProductList ] = useState([])

  useEffect(() => {
    (async () => {
      const titleData = await products.getTitle() // call
      const productsData = await products.getMany() // call
      setTitle(titleData)
      setProductList(productsData)
    })()
  },[])

  return (
    <div className="App">
      <h1>{ title }:</h1>
      <ul>
      { productList.map((p) => (
        <li key={p.id}>{ p.name } - ${p.price}</li>
      ))}
      </ul>
    </div>
  );
}

export default App;
```
Technically, we're just calling the fetchers mapped to the server functions, with the same set of names.