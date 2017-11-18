DB UI ASSIGNMENT
===============================

Assumptions:
* topic /fx/prices sends updates each seconds.

Design 
---

All the new files have been added in `site/src` directory.

* `CurrencyPair` -> Model to represent the currency data
* `CurrencyPairView` -> Encapsulates `CurrencyPair` an also creates a table row node when required
* `CurrencyPairCollection` -> Represents a list of `CurrencyPair` items. On every new `CurrencyPair` is received or updates, it sorts the list in increasing order of `lastChangeBid` and fires all the subscribed listeners. It also fires all the listeners subscribed to sparkline event every given interval while creating the object.
* `GridView` -> This is the main view that represents the table data. This class performs functionality specific to browser, like --
    * subscribing to the `/fx/prices` channel to get updates
    * render the table data on every update received
    * render the sparkline every 30 seconds from the history of updates
    * first sparkline is generated when first data comes for each of the currency pair. Then it refreshes every 30 seconds as stated above.


Usage
-----

The solution is in the `site/index.html` file.

To view the solution, run

```
npm install
npm start
```

from within this directory.  This will start a development server (using webpack). Once the development server has started, navigate to [http://localhost:8011](http://localhost:8011) to see the solution

To run test,

```
npm test
```

Test framework is used is `mocha` and test runner is `karma` alongwith the `expect` assertion library. All test files are in `site/src` and the name ends with `.spec.js`.


Libraries/frameworks that can be used for better performance.
----
React(Redux if needed) can be used for better performance and better code maintenance.
ReactJs allows to create reusable components with low coupling and makes maintainability easier.
In this project ReactJs can be used to create a reusable Table components that takes the data via props and renders the table.Updating the state will not render the whole table again it renders the part of the DOM which was changed/updated. 
It increases the performance.

Build a very similar to this using React.js which you may also find i my Git repo here [react-stocks-ticker](https://github.com/utkarsh8085/react-stocks-ticker) or you may directly check its deployed version here [Stock Ticker](http://utkarsh8085.github.io/stocks-ticker/#/). Make sure to allow "mixed content" in your browser in order to perfectly load the deployed URL as the data coming from the WebSocket server is not in https.

 

Contact details
---
If you have any trouble running it you can get in touch with me on my email id.

email id: utkarsh.rajtech@gmail.com

Name: Utkarsh Raj
