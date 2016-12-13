import _ from 'lodash'

import React, { Component } from 'react'

import { observer } from 'mobx-react'

import $ from 'jquery'

import stores from '/stores'

const { menu, sheets, patterns } = stores

@observer
export default class index extends Component {
  render() {
    return <div className='ui-menu'>
      <div>{menu.store.url}</div>
      <div onClick={test}>测试</div>
      <div onClick={openOptionsPage}>设置</div>
    </div>
  }
}

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    console.log(request.source)
  }
})

function test() {

  const query = {}

  chrome
    .tabs
    .query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT }, tabs => {
      const url = tabs[0].url
      sheets.db.find({}, (err, resp) => {
        _.each(resp, r => {
          // 比较一下 url，这里可以写一些复杂的匹配方式
          if (url.includes(r.sourceUrl)) {
            patterns.db.find({ sheetId: r._id }, (err, pattern) => {
              _.each(pattern, (v, k) => {
                query[v.name] = v.sourcePattern
              })

              const queryStr = JSON.stringify(query)

              chrome.tabs.executeScript(null, {
                code: `
                  var results = {}
                  var queryStr = ${queryStr}
                  for (var q in queryStr) {
                    var dom = document.querySelector(queryStr[q])
                    var result = dom.value || dom.innerText
                    results[q] = result
                  }
                  chrome.runtime.sendMessage({
                    action: 'getSource',
                    source: results
                  })
                `
              }, function() {
                // If you try and inject into an extensions page or the webstore/NTP you'll get an error
                if (chrome.runtime.lastError) {
                  console.log(1)
                }
              })
            })
          }
        })
      })
    })
}

function openOptionsPage() {
  const url = 'chrome://extensions/?options=' + chrome.runtime.id
  chrome
    .tabs
    .create({ url })
}
