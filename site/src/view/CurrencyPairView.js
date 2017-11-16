import CurrencyPair from '../model/CurrencyPair'

/*
 * A view to render CurrencyPair model.
 * A single view represents a single row in the table.
 */
export default class CurrencyPairView {
  constructor(data) {
    this.currencyPair = new CurrencyPair(data);

    this.stockRow = null
    this._sparkLine = null
    this.initialSparklineRendered = false
  }

   /*
   * Create and cache the DOM nodes. Update its data too.
   */
  getStockRowNode() {
    if (this.stockRow) {
      this.stockRowName.textContent = this.currencyPair.name.toUpperCase()
      this.stockRowBestBid.textContent = this.currencyPair.bestBid.toFixed(3)
      this.stockRowBestAsk.textContent = this.currencyPair.bestAsk.toFixed(3)
      this.stockRowLastChangeBestBid.textContent = this.currencyPair.lastChangeBid.toFixed(3)
      this.stockRowLastChangeBestAsk.textContent = this.currencyPair.lastChangeAsk.toFixed(3)
      return this.stockRow
    }
    const tr = document.createElement('tr')
    const tdName = document.createElement('td')
    tdName.textContent = this.currencyPair.name.toUpperCase()
    tdName.setAttribute('class', 'currency-pair-name')
    const tdBestBid = document.createElement('td')
    tdBestBid.textContent = this.currencyPair.bestBid.toFixed(3)
    const tdBestAsk = document.createElement('td')
    tdBestAsk.textContent = this.currencyPair.bestAsk.toFixed(3)
    const tdLastChangeBestBid = document.createElement('td')
    tdLastChangeBestBid.textContent = this.currencyPair.lastChangeBid.toFixed(3)
    const tdLastChangeBestAsk = document.createElement('td')
    tdLastChangeBestAsk.textContent = this.currencyPair.lastChangeAsk.toFixed(3)
    const tdSparkline = document.createElement('td')
    tdSparkline.setAttribute('class', 'currency-sparkline')
    const sparks = document.createElement('span')
    tdSparkline.appendChild(sparks)
    tr.appendChild(tdName)
    tr.appendChild(tdBestBid)
    tr.appendChild(tdBestAsk)
    tr.appendChild(tdLastChangeBestBid)
    tr.appendChild(tdLastChangeBestAsk)
    tr.appendChild(tdSparkline)

    this.stockRow = tr
    this.stockRowName = tdName
    this.stockRowBestBid = tdBestBid
    this.stockRowBestAsk = tdBestAsk
    this.stockRowLastChangeBestBid = tdLastChangeBestBid
    this.stockRowLastChangeBestAsk = tdLastChangeBestAsk
    this._sparks = sparks
    return this.stockRow
  }

  resetData(data) {
    this.currencyPair.resetData(data)
  }

  /*
  Draw sparkline from the change history maintained
  */
  drawSparkLine() {
    const data = this.currencyPair.getSparkLineData()
    this.currencyPair._history = []
    if (!this._sparkLine) {
      this._sparkLine = new Sparkline(this._sparks)
    }
    this._sparkLine.draw(data)
    this.currencyPair.resetHistory()
  }

  drawInitialSparkLine() {
    if (this.initialSparklineRendered) {
      return
    }
    this.initialSparklineRendered = true
    const data = this.currencyPair.getSparkLineData()
    if (!this._sparkLine) {
      this._sparkLine = new Sparkline(this._sparks)
    }
    this._sparkLine.draw(data)
  }
}