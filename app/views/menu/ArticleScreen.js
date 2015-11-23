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
var apilist = require('../../webapi/apilist');
var lang = require('moment/locale/zh-cn');
var DETAIL_PATH = apilist.DETAIL_API;
var ArticleScreen = React.createClass({
  getInitialState() {
    console.log("getInitialState")
    return {
     url: DETAIL_PATH,
   }
 },
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

  getTopicById(id){
    console.log(this.stateurl)
    console.log(id)
    return this.url + id;
  },
  render() {
    return (
      <View >
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>{this.props.story.title}</Text>
          <Text style={styles.secend}>{this.props.story.node_name}.{this.props.story.user.login}</Text>
          <Text style={styles.three}>发表于{moment(this.props.story.created_at).fromNow()}.最后由{this.props.story.last_reply_user_login}于{moment(this.props.story.replied_at).fromNow()}回复</Text>
        </View>
        <View style={styles.card}>
          <Text>帖子详情</Text>
        </View>
      </View>

    )
  }
})

var styles = StyleSheet.create({
  titleContainer: {
    // padding: 10,
    backgroundColor:'#5555DD',
    height:150,

  },
  title:{
    paddingLeft:10,
    paddingTop:10,
    color:'white',
    fontSize:15,
    width:250,
  },
  secend:{
    paddingLeft:10,
    paddingTop:4,
    color:'white',
    fontSize:13,
  },
  three:{
    paddingLeft:10,
    paddingTop:4,
    color:'white',
    fontSize:13,
    width:200,
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
