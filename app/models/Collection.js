var _ = require('underscore')
var {EventEmitter} = require('events')
var urlJoin = require('url-join')

class CollectionStore extends EventEmitter {
  static url() { throw new Error('unimplemented method') }
  static fetch(id) {
    console.log(this.url);
    return fetch(urlJoin(this.url(), id))
      .then(response => response.json())
  }
  //构造方法
  constructor() {
    super()
    //初始化数组对象
    console.log("collection->init")
    this.items = {}
  }
  emitChange() {
    this.emit('change')
  }
  fetch(id) {
    return this.constructor.fetch(id)
      .then((item) => this.set(item))
  }
  set(item) {
    // console.log(item)
    this.items[item.id] = item
    this.emitChange()
    return item
  }

  get(id) {
    return this.items[id]
  }
  all() {
    return _.values(this.items)
  }
  reset(items) {
    this.items = {}
    _.each(items, (item) => {
      // console.log(item)
      this.set(item)
    })
  }
  toJSON() {
    return this.items
  }
}

module.exports = CollectionStore
