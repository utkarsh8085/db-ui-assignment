/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')

// if you want to use es6, you can do something like
//     require('./es6/myEs6code')
// here to load the myEs6code.js file, and it will be automatically transpiled.


const GridView = require('./site/src/view/GridView').default


// Change this to get detailed logging from the stomp library
global.DEBUG = false

const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url)
client.debug = function (msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

const gridView = new GridView(client, '/fx/prices', document.getElementsByTagName('tbody')[0])


//Initializing gridView to listen stomp client data changes and than render
function connectCallback() {
  gridView.initialize()
}

client.connect({}, connectCallback, function (error) {
  gridView.unsubscribe()
})

