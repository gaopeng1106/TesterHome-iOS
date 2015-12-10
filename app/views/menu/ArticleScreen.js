var moment = require('moment')
var React = require('react-native')
var markdown = require('markdown').markdown
var _ = require('underscore')
var ScrollableTabView = require('react-native-scrollable-tab-view');
var FacebookTabBar = require('../../vendor/FacebookTabBar');
var Markdown = require('../../vendor/md/Markdown');
var moment = require('moment');
var lang = require('moment/locale/zh-cn');
var { Icon, } = require('react-native-icons');
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
var currentApi = apilist.DETAIL_API;
var currentWebviewApi = apilist.WEBVIEW_DETAIL_API;
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var ArticleScreen = React.createClass({
  mixins: [
    StoreWatchMixin,
  ],
  getInitialState() {
    return {
      id : this.props.id,
      url: currentApi + this.props.id,
      webUrl:currentWebviewApi + this.props.id,
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

  render() {
    console.log("render : " + this.state.story)
    if (!(this.state.story)) {
      return (
        <Loading>获取帖子详细信息...</Loading>
      )
    } else {
      console.log("webview : " + 'https://testerhome.com/' + this.state.story.user.avatar_url)

      return (
        <View style={styles.container}>
          <View style={[styles.titleContainer,styles.titleOne]}>
            <Text style={[styles.title,styles.titileWidth]} >{this.state.story.title}</Text>
            <Image style={styles.logo} source={{uri: 'https://testerhome.com/' + this.state.story.user.avatar_url}}/>
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.title,styles.secendTitileWidth]}>{this.state.story.node_name}</Text>
            <Text style={[styles.title,styles.secendTitileWidth]}>.{this.state.story.user.login}</Text>
            <Text style={[styles.title,styles.secendTitileWidth]}>.{moment(this.state.story.created_at).fromNow()}</Text>
            <Text style={[styles.title,styles.secendTitileWidth]}>.{this.state.story.hits}次阅读</Text>
          </View>
          <View style={styles.titleContainer}>

          </View>
          <WebView
            url={this.state.webUrl}
            renderError={this.renderError}
            renderLoading={this.renderError}
            />
        </View>
      )
    }
  }
})

var styles = StyleSheet.create({
  container:{
    flex:1,
  },
  titleContainer: {
    padding:10,
    backgroundColor:'#5555DD',
    flexDirection:'row',
    justifyContent:'flex-start',
  },
  title:{
    color:'white',
    flexWrap:'wrap',
  },
  titileWidth:{
    fontSize:15,
    width: width*7/10,
  },
  secendTitileWidth:{
    fontSize:13,
  },
  logo:{
    width:48,
    height:48,
    marginLeft:10,
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
