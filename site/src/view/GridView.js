import CurrencyPairCollection from '../collection/CurrencyPairCollection'

/** Class for rendering grid with client data */
export default class GridView {
    /**
     * @author Utkarsh Raj (utkarsh.rajtech@gmail.com)
     * @param {StompClientInstance} client - The stomp client connected to websocket.
     * @param {string} channel - The channel to subscribe to for receiving realtime price updates.
     * @param {Node} containerNode - The DOM Node to which the table data will be rendered on every new update.
     */
    constructor(client, channel, containerNode) {
        this.client = client
        this.channel = channel
        this.containerNode = containerNode
        this._firstSparklineRendered = false

        this.initialize = this.initialize.bind(this)
        this.newDataReceivedCallback = this.newDataReceivedCallback.bind(this)
        this.subscribe = this.subscribe.bind(this)
        this.unsubscribe = this.unsubscribe.bind(this)
        this.renderGrid = this.renderGrid.bind(this)        

        this.currencyPairCollection = new CurrencyPairCollection(30 * 1000)
    }

    /**
     * initiatilize this view for stomp client 
     */
    initialize() {
        this.subscribe()
    }

    /* Subscribe to the prices channel */
    subscribe() {
        this.clientSubscriptionID = this.client.subscribe(this.channel, this.newDataReceivedCallback)
        this.currencyPairCollection.subscribe(this.renderGrid)
        this.currencyPairCollection.subscribe(this.drawInitialSparkLine)
        this.currencyPairCollection.subscribeToSparkLine(this.drawSparkLine)
    }

    /*
    * Callback which is called on every new data received
    */
    newDataReceivedCallback(e) {
        const currencyPairData = JSON.parse(e.body)
        this.currencyPairCollection.updateGridData(currencyPairData)
    }

    /*
    * Unsubscribe from stomp client and currency collection
    */
    unsubscribe() {
        this.client.unsubscribe(this.clientSubscriptionID)
        this.currencyPairCollection.unsubscribe(this.render)
        this.currencyPairCollection.unsubscribe(this.drawInitialSparkLine)
        this.currencyPairCollection.unsubscribeFromSparkLine(this.drawSparkLine)
    }

    /*
    * Render the CurrencyPair from model into grid rows view
    */
    renderGrid(currencyPairList) {
        const node = this.containerNode
        while (node.firstChild) {
            node.removeChild(node.firstChild)
        }
        currencyPairList.forEach(pair => {
            node.appendChild(pair.getStockRowNode())
        })
        if (!this._firstSparklineRendered) {
            this._firstSparklineRendered = true
        }
    }

    /*
    * Trigger sparkline draw for each currency pair in array.
    */
    drawSparkLine(currencyPairList) {
        currencyPairList.forEach(pair => {
            pair.drawSparkLine()
        })
    }

    /*
    * Draw initial sparkline when first set of data comes
    */
    drawInitialSparkLine(currencyPairList) {
        currencyPairList.forEach(pair => {
            pair.drawInitialSparkLine()
        })
    }

}
