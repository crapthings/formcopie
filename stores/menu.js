import { observable } from 'mobx'

import DB from 'nedb'

const db = new DB({
  filename: '../menu',
  autoload: true,
})

class store {
    @observable url = 'undefined'
}

export default {
  db,
  store: new store(),
}
