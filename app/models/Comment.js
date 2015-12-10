var urlJoin = require('url-join')
var CollectionStore = require('./Collection')


class CommentStore extends CollectionStore {
  static url() { return DETAIL_PATH }
  static fetch(url) {
    return fetch(url)
      .then(response => response.json())
  }
  fetch(url) {
    console.log("Story->fetch : " + url)
    return this.constructor.fetch(url)
      .then((items) => {
        this.reset(items.replies)
        this.emitChange()
        return items
      })
  }
  ordered() {
    return this.all()
  }
}

module.exports = new CommentStore
