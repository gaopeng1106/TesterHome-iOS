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
        return <HomeTab/>
      }else if(nav=="star"){
        return <StarTab/>
      }else if(nav=="messages"){
        return <NotificationTab/>
      }else if(nav=="me"){
        return <MeTab/>
      }else{
        <View style={styles.card}>
          <Text>为发现匹配视图</Text>
        </View>
      }
    },


    render(){
      return(
        <View>
         {this._selectView(this.props.needSlideContents)}
        </View>
      );
    }



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
module.exports=SelectTab;
