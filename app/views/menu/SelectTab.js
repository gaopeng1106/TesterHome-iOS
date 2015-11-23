'use strict'
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
} = React;
var HomeTab = require('./HomeTab');
var StarTab = require('./StarTab');
var NotificationTab = require('./NotificationTab');
var MeTab = require('./MeTab');
var SelectTab = React.createClass({
    _selectView(nav){
      if(nav=="home"){
        return <HomeTab navigator={this.props.navigator}/>
      }else if(nav=="star"){
        return <StarTab/>
      }else if(nav=="messages"){
        return <NotificationTab/>
      }else if(nav=="me"){
        return <MeTab/>
      }else{
        <View style={styles.card}>
          <Text>未发现匹配视图</Text>
        </View>
      }
    },
    render(){
      return(
        <View style={styles.card}>
         {this._selectView(this.props.needSlideContents)}
        </View>
      );
    }
});
var styles = StyleSheet.create({
  card: {
    flex:1,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    // margin: 5,
    // padding: 15,
    // marginBottom:95,
  },

});
module.exports=SelectTab;
