import expect from 'expect'

import data from '../mockData'

import CurrencyPair from './CurrencyPair'

describe('CurrencyPair', () => {

  const cp = new CurrencyPair(data)

  it('should init data', () => {
    expect(cp.name).toEqual(data.name)
    expect(cp._history.length).toEqual(1)
  })

  it('resetData should update history', () => {
    cp.resetData(data)
    expect(cp._history.length).toEqual(2)
  })

  it('should return sparkline data', () => {
    const sparklineData = cp.getSparkLineData()
    expect(sparklineData.length).toEqual(2)
  })

  it('resetHistory should clear history', () => {
    cp.resetHistory()
    expect(cp._history.length).toEqual(0)
  })

})
