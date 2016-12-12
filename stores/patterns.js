import { observable } from 'mobx'

import DB from 'nedb'

const db = new DB({
  filename: '../patterns',
  autoload: true,
})

class store {
    @observable list = []
}

export default {
  db,
  store: new store(),
}
