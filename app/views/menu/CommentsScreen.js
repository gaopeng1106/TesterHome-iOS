var _ = require('underscore')
var moment = require('moment')
var React = require('react-native')
var {
  ListView,
  StyleSheet,
} = React
var RefreshableListView = require('react-native-refreshable-listview')

var Story = require('../../models/Comment')
var Routes = require('../../Routes')
var StoreWatchMixin = require('./StoreWatchMixin')
var View = require('./View')
var Text = require('./Text')
var Badge = require('./Badge')
var Loading = require('./Loading')
var Comment = require('./Comment')
var apilist = require('../../webapi/apilist');
var currentApi = apilist.DETAIL_API;
var baseDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})

var CommentsScreen = React.createClass({
  mixins: [
    StoreWatchMixin,
  ],
  getInitialState() {
    return {
      id : this.props.id,
      url: currentApi + this.props.id + "/replies.json",
      dataSource: baseDataSource.cloneWithRows(this.getComments() || []),
    }
  },
  componentDidMount() {
    console.log("componentDidMount")
    if (!this.getStory().length) this.loadStory()
  },
  getStoreWatches() {
    this.watchStore(Story, _.debounce(() => {
      if (this.isMounted()) {
        console.log("CommentsScreen->getStoreWatches")
        this.setState({
          dataSource: baseDataSource.cloneWithRows(this.getComments() || []),
        })
      }
    }, 100))
  },
  loadStory(callback) {
    console.log("loadStory : " + this.state.url)
    Story.fetch(this.state.url).then(callback)
  },
  getStory() {
    console.log("getStory : ")
    // console.log(Story.ordered());
    return Story.ordered();
  },
  getComments() {
    var story = this.getStory()
    return story
  },
  isLoaded() {
    return this.getComments() != null
  },
  renderComment(comment) {
    return <Comment comment={comment} />
  },
  render() {
    if (!this.isLoaded()) {
      return <Loading>comments</Loading>
    } else {
      return (
        <RefreshableListView
          dataSource={this.state.dataSource}
          renderRow={this.renderComment}
          loadData={this.loadStory}
          refreshDescription="Fetching comments"
        />
      )
    }
  }
})

var styles = StyleSheet.create({
})

module.exports = CommentsScreen
