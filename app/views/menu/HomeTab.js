'use strict';

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


var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.id !== r2.id
})
var HomeTab = React.createClass({
  getInitialState() {
   return {
     dataSource: ds.cloneWithRows(this.getTopStories()),
   }
 },
  renderItem(item) {
    return (
      <View style={{height: 40, backgroundColor: '#ffffff', borderWidth: 0.5, borderColor: '#d6d7da'}}>
        <Text>
          {item.position()}
        </Text>
      </View>
    )
  },
  componentDidMount() {
    var topStories = this.getTopStories()
    if (!(topStories && topStories.length)) this.loadTopStories()
  },
  loadTopStories() {
    
    return TopStory.fetch()
  },
  getTopStories() {
    console.log("getTopStories");
    return TopStory.ordered()
  },
  render() {
    return (
      <RefreshableListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem}
        loadData={this.loadTopStories}
        refreshDescription="Refreshing items"
        refreshPrompt="Pull down to refresh"
      />
    )
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
