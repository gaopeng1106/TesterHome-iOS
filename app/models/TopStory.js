var _ = require('underscore')
var urlJoin = require('url-join')
var CollectionStore = require('./Collection')
var config = require('../config')

const API_PATH = urlJoin(config.apiBaseUrl, '/topics.json')
// const API_PATH = urlJoin(config.apiBaseUrl, '/')

class TopStoryStore extends CollectionStore {
  static url() {
    return API_PATH
  }
  static fetch() {
    return fetch(this.url())
      .then(response => response.json())
  }
  fetch() {
    return this.constructor.fetch()
      .then((items) => {
        this.reset(items)
        this.emitChange()
        return items
      })
  }
  ordered() {
    console.log("ordered : " + this.all());
    return _.sortBy(this.all(), 'id')
  }
}

module.exports = new TopStoryStore
