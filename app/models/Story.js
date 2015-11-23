var urlJoin = require('url-join')
var CollectionStore = require('./Collection')


class StoryStore extends CollectionStore {
  static url() { return DETAIL_PATH }
  static fetch(url) {
    return fetch(url)
      .then(response => response.json())
  }
  fetch(url) {
    return this.constructor.fetch(url)
      .then((items) => {
        this.reset(items)
        this.emitChange()
        return items
      })
  }
}

module.exports = new StoryStore
