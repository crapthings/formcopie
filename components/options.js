import React from 'react'

import stores from '/stores'

const { sheets } = stores

import ActionComponent from './action'
import SheetFormComponent from './form/sheet'
import SheetsComponent from './sheets'

export default () => <div>
  <div id="test">wowowowo</div>
  <ActionComponent />
  <SheetFormComponent />
  <SheetsComponent />
</div>
