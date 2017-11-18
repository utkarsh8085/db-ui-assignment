import expect from 'expect'

import data from '../mockData';

import CurrencyPairView from './CurrencyPairView'

describe('CurrencyPairView', () => {
  const cpv = new CurrencyPairView(data)
  it('should have null node initially', () => {
    expect(cpv.stockRow).toEqual(null)
    expect(cpv._sparkLine).toEqual(null)
  })

  it('should update history on resetData', () => {
    cpv.resetData(data)
    expect(cpv.currencyPair._history.length).toEqual(2)
  })

  it('should return tr node using getStockRowNode', () => {
    const node = cpv.getStockRowNode()
    expect(node.tagName).toEqual('TR')
    expect(node.children.length).toEqual(6)
    for(var i=0; i<node.children.length; i++) {
      expect(node.children[i].tagName).toEqual('TD')
    }
    expect(node.children[0].textContent).toEqual(data.name)
  })

  it('should update name in dom when data changes', () => {
    const newData = Object.assign({}, data, {
      name: 'inrusd'
    });
    cpv.resetData(newData)
    const node = cpv.getStockRowNode()
    expect(node.children[0].textContent).toEqual(newData.name)
  })
})
