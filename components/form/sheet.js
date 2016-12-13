import React from 'react'

import stores from '/stores'

const { sheets } = stores

import { form2js } from 'form2js'

const FormEvents = {
  onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = form2js('sheet-form')
     sheets.db.insert(data, (err, insertResp) => {
      !err && sheets.db.find({}, (err, findResp) => {
        if (!err) {
          sheets.store.list = findResp
          form.reset()
        }
      })
    })
  }
}

const FormComponent = () => <form id="sheet-form" onSubmit={FormEvents.onSubmit}>
  <input type="text" name="name" placeholder="名称" required />
  <input type="text" name="sourceUrl" placeholder="源url" required />
  <input type="text" name="targetUrl" placeholder="目标url" required />
  <input type="submit" value="创建" />
</form>

export default FormComponent
