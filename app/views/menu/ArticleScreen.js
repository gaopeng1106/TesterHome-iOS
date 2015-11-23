var moment = require('moment')
var React = require('react-native')
var {
  WebView,
  ScrollView,
  StyleSheet,
} = React

var View = require('./View')
var Text = require('./Text')
var Loading = require('./Loading')

var ArticleScreen = React.createClass({
  renderError(domain, code, description) {
    return <Text>error :( - {description}</Text>
  },
  renderLoading() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Loading>article</Loading>
      </ScrollView>
    )
  },
  render() {
    return (
      <View style={styles.card}>
       <Text>帖子详情</Text>
      </View>
    )
  }
})

var styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
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
})

module.exports = ArticleScreen
