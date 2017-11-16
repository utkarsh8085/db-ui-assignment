import CurrencyPairView from '../view/CurrencyPairView'

/*
* Represents a sorted list of CurrencyPair collection
* which can be subscribed for getting updates when data changes
*/
export default class CurrencyPairCollection {
  /*
  * @param {number} interval - The number of milliseconds at which sparkline listeners will be fired.
  */
  constructor(interval = null) {
    this.list = []
    this.presentPairs = {}

    this.handlers = []
    this.sparkLineHandlers = []

    this.updateGridData = this.updateGridData.bind(this)
    this.subscribe = this.subscribe.bind(this)
    this.unsubscribe = this.unsubscribe.bind(this)
    this.fire = this.fire.bind(this)
    this.fireSparkLine = this.fireSparkLine.bind(this)

    if (interval !== null) {
      this._sparkLineIntervalID = setInterval(this.fireSparkLine, interval)
    } else {
      this._sparkLineIntervalID = null
    }
  }

  /* Subscribe to data changes */
  subscribe(listener) {
    this.handlers.push(listener)
  }

  /*
  * If the received websocket currency pair  is already present, only update
  * its values, otherwise, create a new CurrencyPair and add it to
  * sortable array. This array will be used to render the rows
  * of the table on every new data update.
  */
  updateGridData(data) {
    if (this.presentPairs.hasOwnProperty(data.name)) {
      this.presentPairs[data.name].resetData(data)
    } else {
      this.presentPairs[data.name] = new CurrencyPairView(data)
      this.list.push(this.presentPairs[data.name])
    }
    this.list.sort(this.sorter)
    this.fire()
  }

  /* Sort the currency pairs based on `lastChangeBid` in ascending order */
  sorter(pair, nextPair) {
    return pair.currencyPair.lastChangeBid - nextPair.currencyPair.lastChangeBid
  }


  /* Unsubscribe to data changes */
  unsubscribe(fn) {
    this.handlers = this.handlers.filter(item => item !== fn)
  }

  subscribeToSparkLine(handler) {
    this.sparkLineHandlers.push(handler);
  }

  unsubscribeFromSparkLine(fn) {
    this.sparkLineHandlers = this.sparkLineHandlers.filter(item => item !== fn)
  }

  fireSparkLine() {
    this.sparkLineHandlers.forEach(fn => {
      fn(this.list)
    })
  }

  fire() {
    this.handlers.forEach(fn => {
      fn(this.list)
    })
  }
}
