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
var apilist = require('../../webapi/apilist');
var Routes = require('../../Routes')
var API_RECENT_PATH = apilist.RECENT_TOP_API;

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
     limit:20,
     url: apilist.fetchResourceWithPage(API_RECENT_PATH,)   
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
  //查看评论
  gotoComments(story) {
    this.props.navigator.push(Routes.Comments(story))
  },
  //查看帖子
  gotoArticle(story) {
    this.props.navigator.push(Routes.Article(story))
  },
  loadTopStories() {
    // console.log("loadTopStories : " + this.state.url)
    return TopStory.fetch(this.state.url)
  },
  getTopStories() {
    return TopStory.ordered()
  },
  loadMore() {
    // console.log("bottom")
    this.state.limit = this.state.limit + 20
    this.state.url=apilist.fetchResourceWithPage(API_RECENT_PATH,0,this.state.limit)
    this.loadTopStories()
    this.setState({dataSource: ds.cloneWithRows(this.getTopStories())})
  },
  render() {
    if (this.state.dataSource.getRowCount() === 0) {
      return (
        <Loading>获取中...</Loading>
      )
    } else {
        return (
          <RefreshableListView
            dataSource={this.state.dataSource}
            renderRow={this.renderItem}
            loadData={this.loadTopStories}
            style={styles.topicListView}
            ignoreInertialScroll={true}
            refreshDescription="更新"
            refreshPrompt="Pull down to refresh"
            removeClippedSubviews={true}
            onEndReachedThreshold={0}
            onEndReached={this.loadMore}
            minDisplayTime={500}
            minPulldownDistance={80}
            minBetweenTime={2000}
            // refreshingIndictatorComponent={
            //   <RefreshableListView.RefreshingIndicator stylesheet={styles} />
            // }
          />

        )
      }
  },


});

var styles = StyleSheet.create({

  topicListView: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 5,
    overflow: 'hidden'
  },

});
module.exports = HomeTab;
