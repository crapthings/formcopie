import React, { Component } from 'react'

import { observer } from 'mobx-react'

import stores from '/stores'

const { menu } = stores

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
    console.log(request, sender)
  }
})

function test() {
  // chrome
  //   .tabs
  //   .query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT }, tabs => {
  //     menu.store.url = tabs[0].url
  //     const a = document.querySelector('#test')
  //     menu.store.url = a
  //     console.log(a)
  //   })

  // chrome.runtime.sendMessage({
  // action: "getSource",
  // source: 111,
  // })

  chrome.tabs.executeScript(null, {
    file: "exec.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      console.log(1)
    }
  });
}

function openOptionsPage() {
  const url = 'chrome://extensions/?options=' + chrome.runtime.id
  chrome
    .tabs
    .create({ url })
}
