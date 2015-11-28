var moment = require('moment')
var React = require('react-native')
var _ = require('underscore')
var ScrollableTabView = require('react-native-scrollable-tab-view');
var FacebookTabBar = require('../../vendor/FacebookTabBar');
var {
  WebView,
  ScrollView,
  StyleSheet,
  Image,
} = React

var View = require('./View')
var Text = require('./Text')
var Loading = require('./Loading')
var config = require('../../config');
var lang = require('moment/locale/zh-cn');
var Story = require('../../models/Story')
var apilist = require('../../webapi/apilist');
var StoreWatchMixin = require('./StoreWatchMixin')
var currentapi = apilist.DETAIL_API;
var ArticleScreen = React.createClass({
  mixins: [
    StoreWatchMixin,
  ],
  getInitialState() {
    return {
      id : this.props.id,
      url: currentapi + "/" + this.props.id,
      story:this.getStory(),
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
  componentDidMount() {
    console.log("Article->: " + this.props.id)
    var story = this.getStory()
    if (!(story && story.length)) this.loadStory()
  },
  getStoreWatches() {
    this.watchStore(Story, _.debounce(() => {
      if (this.isMounted()) {
        console.log("加载完成")
        this.setState({story:this.getStory()})
      }
    }, 100))
  },
  loadStory(){
    console.log("current: "+this.state.url)
    return Story.fetch(this.state.url);
  },
  getStory(){
    return Story.get(this.props.id);
  },
  renderTitle(){
      return (
          <Text style={styles.title}>{this.getStory().title}</Text>
      )
  },
  renderLogo(story){
    return(
      <Image style={styles.logo} source={{uri: 'https://testerhome.com/user/large_avatar/5764.jpg'}}/>
    )
  },
  //绘制帖子详情
  renderBody(){
          <ScrollView tabLabel="详情" style={styles.scrollView}>
              <Text style={styles.body}>111</Text>
              <Text>{this.state.story.body}</Text>
          </ScrollView>
  },
  renderTitleAndLogo(story){
    <View style={styles.title}>
      {this.renderTitle(story)}
      {this.renderLogo(story)}
    </View>
  },
  render() {
    console.log("render : " + this.state.story)
    if (!(this.state.story)) {
      return (
        <Loading>获取帖子详细信息...</Loading>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            {this.renderTitle()}
          </View>
          <View style={styles.bodyContainer}>
            <ScrollView style={styles.card}>
              <Text>{this.state.story.body}</Text>
            </ScrollView>
          </View>
        </View>
      )
    }
  }
})

var styles = StyleSheet.create({
  titleContainer: {
    // padding: 10,
    backgroundColor:'#5555DD',
    height:150,

  },
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
  },
  container:{
    flex:1,
  },
  titleOneLine:{
      flexDirection:'row',
  },
  title:{
    paddingLeft:10,
    paddingTop:10,
    color:'white',
    fontSize:15,
    width:250,
    alignItems:'flex-end',
  },
  logo:{
    width:32,
    height:32,
    alignItems:'flex-end',
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
  body:{
    color:'black',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
})

module.exports = ArticleScreen
