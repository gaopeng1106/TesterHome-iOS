/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
} = React;
var ScrollableTabView = require('react-native-scrollable-tab-view');
var TesterHome = React.createClass({
  render() {
    return ( < ScrollableTabView >
      < ScrollView tabLabel = "React" / >
      < ScrollView tabLabel = "Flow" / >
      < ScrollView tabLabel = "Jest" / >
      < /ScrollableTabView>
    );
  }
});

var styles = StyleSheet.create({

});
AppRegistry.registerComponent('TesterHome', () => TesterHome);
