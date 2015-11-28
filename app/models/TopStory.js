var _ = require('underscore')
var urlJoin = require('url-join')
var CollectionStore = require('./Collection')
var apilist = require('../webapi/apilist');

var API_PATH = apilist.RECENT_TOP_API;
// const API_PATH = urlJoin(config.apiBaseUrl, '/')

class TopStoryStore extends CollectionStore {
  static url() {
    console.log(API_PATH)
    return API_PATH
  }
  static fetch(url) {
    return fetch(url)
      .then(response => response.json())
  }
  fetch(url) {
    return this.constructor.fetch(url)
      .then((items) => {
        this.reset(items.topics)
        this.emitChange()
        return items
      })
  }
  ordered() {
    console.log()
    return _.sortBy(this.all(),function(item) {
                                  return - item.id;
                                },'id')
  }

}

module.exports = new TopStoryStore
