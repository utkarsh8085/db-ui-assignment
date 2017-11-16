/*
* The model to represent currency data
*/
export default class CurrencyPair {
    constructor(data) {
      this._history = []
  
      this.resetData = this.resetData.bind(this)
      this.getSparkLineData = this.getSparkLineData.bind(this)
      this.resetHistory = this.resetHistory.bind(this)
  
      this.resetData(data)
    }
  
    resetData(data) {
      this.name = data.name
      this.bestBid = data.bestBid
      this.bestAsk = data.bestAsk
      this.lastChangeBid = data.lastChangeBid
      this.lastChangeAsk = data.lastChangeAsk
      this._history.push([data.bestBid, data.bestAsk])
    }
  
    /*
    * @return {Array} An array of midprice history.
    */
    getSparkLineData() {
      const data = this._history.map(item => {
        return (item[0] + item[1]) / 2
      })
      return data;
    }
  
    resetHistory() {
      this._history = []
    }
  }
  