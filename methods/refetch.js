import _ from 'lodash'

import stores from '/stores'

export default (form) => {
  _.each(stores, ({db, store}) => {
    db.find({}, (err, resp) => {
      if (!err) {
        store.list = resp
        form && form.reset()
      }
    })
  })
}
