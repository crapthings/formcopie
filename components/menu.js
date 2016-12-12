import React from 'react'

export default () => <div className='ui-menu'>
  <div onClick={openOptionsPage}>设置</div>
</div>

function openOptionsPage() {
  const url = 'chrome://extensions/?options=' + chrome.runtime.id
  chrome
    .tabs
    .create({ url })
}
