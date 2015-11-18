'use strict';
var _ = require('underscore')
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ListView,
} = React;
var RefreshableListView = require('react-native-refreshable-listview')
var delay = require('react-native-refreshable-listview/lib/delay')
var TopStory = require('../../models/TopStory')
var Loading = require('./Loading')
var StoreWatchMixin = require('./StoreWatchMixin')
var StoryListItem = require('./StoryListItem')


var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.id !== r2.id
})
var HomeTab = React.createClass({
  mixins: [
    StoreWatchMixin,
  ],
  getInitialState() {
    console.log("getInitialState")
   return {
     dataSource: ds.cloneWithRows(this.getTopStories()),
   }
 },
 renderItem(story) {
  //  console.log("============")
  //  console.log(story.id)
   return (
     <StoryListItem
       story={story}
       onSelectComments={this.gotoComments}
       onSelectArticle={this.gotoArticle}
     />
   )
 },
  componentDidMount() {
    console.log("componentDidMount")
    var topStories = this.getTopStories()
    if (!(topStories && topStories.length)) this.loadTopStories()
  },
  getStoreWatches() {
    this.watchStore(TopStory, _.debounce(() => {
      if (this.isMounted()) {
        this.setState({dataSource: ds.cloneWithRows(this.getTopStories())})
      }
    }, 100))
  },

  loadTopStories() {
    console.log("loadTopStories")
    return TopStory.fetch()
  },
  getTopStories() {
    return TopStory.ordered()
  },
  render() {
    if (this.state.dataSource.getRowCount() === 0) {
      return (
        <Loading>top stories</Loading>
      )
    } else {
        return (
          <RefreshableListView
            dataSource={this.state.dataSource}
            renderRow={this.renderItem}
            loadData={this.loadTopStories}
            refreshDescription="Refreshing items"
            refreshPrompt="Pull down to refresh"
          />
        )
      }
  },


});

var styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },

});
module.exports = HomeTab;
