import _ from 'lodash'

import React from 'react'

import stores from '/stores'

const events = {
  resetDB() {
    confirm('确定要清空吗？') && _.each(stores, ({ db, store }) => {
      db.remove({}, { multi: true }, (err, resp) => {
        if (!err)
          store.list = []
      })
    })
  },
}

export default () => <div>
  <button onClick={events.resetDB}>清空全部</button>
</div>
