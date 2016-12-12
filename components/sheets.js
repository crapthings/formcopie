import React, { Component } from 'react'

import { observer } from 'mobx-react'

import stores from '/stores'

const { sheets, patterns } = stores

import PatternFormComponent from './form/pattern'

import refetch from '/methods/refetch'

@observer
class index extends Component {
  constructor() {
    super()
    sheets.db.loadDatabase(err => {    // Callback is optional
      sheets.db.find({}, (err, findResp) => {
        sheets.store.list = findResp
      })
    })
  }

  render() {
    return <div>
      {sheets.store.list.map(({ _id, name, sourceUrl, targetUrl, ...sheet }) => <div key={_id} className='ui-list'>
        <h4>{name}</h4>
        <button onClick={() => remove(_id)}>删除</button>
        <p>源 url: {sourceUrl}</p>
        <p>目标 url: {targetUrl}</p>
        <PatternFormComponent sheetId={_id} />
      </div>)}
    </div>
  }
}

function remove(_id) {
  confirm('确定要删除吗？') && _.each([sheets, patterns], store => {
    // console.log(store)
    store.db.remove({ $or: [{ _id }, { sheetId: _id }] }, (err, resp) => {
      !err && refetch()
    })
  })
}

export default index
