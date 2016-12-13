import React, { Component } from 'react'

import { form2js } from 'form2js'

import { observer } from 'mobx-react'

import stores from '/stores'

const { sheets, patterns } = stores

import PatternFormComponent from './form/pattern'

import PatternListComp from './patterns'

import refetch from '/methods/refetch'

@observer
class index extends Component {
  constructor() {
    super()
    sheets.db.loadDatabase(err => {
      sheets.db.find({}, (err, findResp) => {
        sheets.store.list = findResp
      })
    })
  }

  render() {
    return <div>
      {sheets.store.list.map(({ _id, name, sourceUrl, targetUrl, content, ...sheet }) => <div key={_id} className='ui-list'>
        <h4>{name}</h4>
        <form onSubmit={(e) => onSubmit(e, _id)} id={`form-sheet-${_id}`}>
          <input type="text" name='name' defaultValue={name}/>
          <input type="text" name='sourceUrl' defaultValue={sourceUrl}/>
          <input type="text" name='targetUrl' defaultValue={targetUrl}/>
          <input type="hidden" name='_id' defaultValue={_id} />
          <input type="submit" value='更新' />
          <input type="button" value='删除' onClick={() => remove(_id)} />
        </form>
        <h4>方案</h4>
        <p>{content && JSON.stringify(content)}</p>
        <PatternFormComponent parentId={_id} />
        <PatternListComp parentId={_id} />
      </div>)}
    </div>
  }
}

function onSubmit(e, _id) {
  e.preventDefault()
  const form = e.currentTarget
  const opt = form2js(form.id)
  const data = {
    name: opt.name,
    sourceUrl: opt.sourceUrl,
    targetUrl: opt.targetUrl,
  }
  sheets.db.update({ _id }, { $set: data }, (err, resp) => {
    !err && refetch()
  })
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
