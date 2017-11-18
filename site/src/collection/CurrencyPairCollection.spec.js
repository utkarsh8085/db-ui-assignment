import expect from 'expect'

import data, { getRandomData } from '../mockData';

import CurrencyPairCollection from './CurrencyPairCollection';


describe('CurrencyPairCollection', () => {

  const cc = new CurrencyPairCollection;
  const ccWithInterval = new CurrencyPairCollection(30)

  it('should init with empty currency pair list and handlers', () => {
    expect(cc.list.length).toEqual(0)
    expect(cc.handlers.length).toEqual(0)
    expect(cc.sparkLineHandlers.length).toEqual(0)
    expect(Object.keys(cc.presentPairs).length).toEqual(0)
    expect(cc._sparkLineIntervalID).toEqual(null)
  })

  it('should have an interval ID if sparkline interval is non null', () => {
    expect(ccWithInterval._sparkLineIntervalID).toNotEqual(null)
  })

  it('should call the subscribed listener on data change', () => {
    let initVal = -1
    const func = () => {
      initVal = 1
    }
    cc.subscribe(func)
    expect(initVal).toEqual(-1)
    cc.updateGridData(getRandomData())
    expect(initVal).toEqual(1)
    cc.unsubscribe(func)
    expect(cc.handlers.length).toEqual(0)
  })

  it('should return sorted list of currencyPair data on every update to subscribe functions', () => {
    expect(cc.list.length).toEqual(1)
    let numberOfCalls = 0
    const checkSorter = (list) => {
      numberOfCalls++
      if (list.length <= 1) {
        return
      }
      for(var i=1; i<list.length; i++) {
        expect(list[i].currencyPair.lastChangeBid).toBeGreaterThanOrEqualTo(list[i-1].currencyPair.lastChangeBid)
      }
      expect(list.length).toEqual(Object.keys(cc.presentPairs).length)
    };
    cc.subscribe(checkSorter)
    for(var i=0; i<10; i++) {
      cc.updateGridData(getRandomData())
    }
    expect(numberOfCalls).toEqual(10)
    cc.unsubscribe(checkSorter)
  })

})
