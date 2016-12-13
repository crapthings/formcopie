import React, { Component } from 'react'

import { form2js } from 'form2js'

import stores from '/stores'

const { patterns } = stores

import refetch from '/methods/refetch'

export default ({ parentId }) => <div>
  <form onSubmit={onSubmit} id={`form-pattern-${parentId}`}>
    <input type="text" name='name' placeholder='名称' required />
    <input type="text" name='sourcePattern' placeholder='源选择器' required />
    <input type="text" name='targetPattern' placeholder='目标选择器' required />
    <input type="hidden" name='sheetId' defaultValue={parentId} />
    <input type="submit" value='新建' />
  </form>
</div>

function onSubmit(e) {
  e.preventDefault()
  const form = e.currentTarget
  const data = form2js(form.id)
  patterns.db.insert(data, (err, insertResp) => {
    refetch(form)
  })
}
