import React, { Component } from 'react'

import { observer } from 'mobx-react'

import { form2js } from 'form2js'

import stores from '/stores'

const { patterns } = stores

import PatternFormComponent from './form/pattern'

import refetch from '/methods/refetch'

@observer
class index extends Component {
  constructor() {
    super()
    patterns.db.loadDatabase(err => {
      patterns.db.find({}, (err, findResp) => {
        patterns.store.list = findResp
      })
    })
  }

  render() {
    return <div>
      {patterns.store.list.map(({
          _id,
          sheetId,
          name,
          sourcePattern,
          targetPattern,
          ...pattern,
        }) => <form key={_id} onSubmit={(e) => onSubmit(e, _id) } id={`form-pattern-${_id}`}>
        <input type="text" name='name' defaultValue={name}/>
        <input type="text" name='sourcePattern' defaultValue={sourcePattern}/>
        <input type="text" name='targetPattern' defaultValue={targetPattern}/>
        <input type="hidden" name='sheetId' defaultValue={sheetId} />
        <input type="submit" value='更新' />
        <input type="button" value='删除' onClick={() => remove(_id)} />
      </form>)}
    </div>
  }
}

function onSubmit(e, _id) {
  e.preventDefault()
  const form = e.currentTarget
  const opt = form2js(form.id)
  const data = {
    name: opt.name,
    sourcePattern: opt.sourcePattern,
    targetPattern: opt.targetPattern,
  }
  patterns.db.update({ _id }, { $set: data }, (err, resp) => {
    !err && refetch()
  })
}

function remove(_id) {
  confirm('确定要删除吗？') && patterns.db.remove({ _id }, (err, resp) => {
    !err && refetch()
  })
}

export default index
