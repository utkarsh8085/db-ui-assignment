const startPrices = {
    gbpusd: 1.4587,
    gbpeur: 1.288,
    gbpaud: 1.9107,
    usdeur: 0.883,
    gbpjpy: 158.29,
    usdjpy: 108.505,
    eurjpy: 122.91,
    gbpchf: 1.4126,
    euraud: 1.4834,
    eurchf: 1.0969,
    eurcad: 1.4214,
    gbpcad: 1.8303
  }
  
  const currencies = Object.keys(startPrices)
  const publicData = {}
  const internal = {}
  for (let ccy in startPrices) {
    const spread = Math.random() * 0.05
    const mid = startPrices[ccy]
    internal[ccy] = mid
    publicData[ccy] = {
      name: ccy,
      bestBid: mid - mid * (spread / 2),
      bestAsk: mid + mid * (spread / 2),
      openBid: mid - mid * (spread / 2),
      openAsk: mid + mid * (spread / 2),
      lastChangeAsk: 0,
      lastChangeBid: 0
    }
  }
  
  export const getRandomData = () => {
    const randomCurrency = currencies[Math.floor(Math.random() * currencies.length)]
    const mid = internal[randomCurrency]
    const spread = Math.random() * 0.05
    const diff = (Math.random() * 0.08 - 0.04) * mid
    const newMid = (mid + diff)
    const bid = newMid - newMid * (spread / 2)
    const ask = newMid + newMid * (spread / 2)
    const data = publicData[randomCurrency]
    data.lastChangeBid = bid - data.bestBid
    data.lastChangeAsk = ask - data.bestAsk
    data.bestBid = bid
    data.bestAsk = ask
    return data
  }
  
  
  export default {
    "name": "usdjpy",
    "bestBid": 106.7297012204255,
    "bestAsk": 107.25199883791178,
    "openBid": 107.22827132623534,
    "openAsk": 109.78172867376465,
    "lastChangeAsk": -4.862314256927661,
    "lastChangeBid": -2.8769211401569663
  }
  