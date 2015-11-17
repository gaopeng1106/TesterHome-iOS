 'use strict';

 var React = require('react-native');
 var {
   AppRegistry,
   StyleSheet,
   View,
   NavigatorIOS,
   TabBarIOS,
   Text,
 } = React;
var { TabBarIOS, } = require('react-native-icons');
var SelectTab = require('./app/views/menu/SelectTab');
var TabBarItemIOS = TabBarIOS.Item;
 var TesterHome = React.createClass({
   getInitialState: function() {
     return {
       selectedTab: 'home',
       notifCount: 0,
       presses: 0,
     };
   },
   _renderContent(nav) {
    return ( < NavigatorIOS style = {
        styles.container
      }
      ref = 'INDEX_NAV'
      initialRoute = {
        {
          component: SelectTab,
          title: 'TesterHome',
          passProps: {
            needSlideContents: nav
          },
        }
      }
      shadowHidden = {
        true
      }
      translucent = {
        false
      }
      barTintColor = '#5555DD'
      titleTextColor = '#ffffff'
      tintColor = '#ffffff' / >
    )
  },
   render: function () {
     return (
       <TabBarIOS
         selectedTab={this.state.selectedTab}
         tintColor={'#5555DD'}
         barTintColor={'#ffffff'}
         styles={styles.tabBar}>
         <TabBarItemIOS
           name="home"
           iconName={'ion|ios-home-outline'}
           selectedIconName={'ion|ios-home'}
           title={'社区'}
           iconSize={32}
           accessibilityLabel="Home Tab"
           selected={this.state.selectedTab === 'home'}
           onPress={() => {
             this.setState({
               selectedTab: 'home',
             });
           }}>
           {this._renderContent('home')}
         </TabBarItemIOS>
         <TabBarItemIOS
             name="star"
             iconName={'ion|ios-star'}
             selectedIconName={'ion|ios-star'}
             title={'精华'}
             iconSize={32}
             accessibilityLabel="Star Tab"
             selected={this.state.selectedTab === 'star'}
             onPress={() => {
             this.setState({
               selectedTab: 'star',
             });
           }}>
           {this._renderContent('star')}
         </TabBarItemIOS>
         <TabBarItemIOS
             name="messages"
             iconName={'ion|chatbubble-working'}
             title={'通知'}
             iconSize={32}
             accessibilityLabel="Messages Tab"
             selected={this.state.selectedTab === 'messages'}
             onPress={() => {
             this.setState({
               selectedTab: 'messages',
             });
           }}>
           {this._renderContent('messages')}
         </TabBarItemIOS>
         <TabBarItemIOS
             name="me"
             iconName={'ion|person'}
             selectedIconName={'ion|person'}
             title={'我'}
             iconSize={32}
             accessibilityLabel="Me Tab"
             selected={this.state.selectedTab === 'me'}
             onPress={() => {
             this.setState({
               selectedTab: 'me',
             });
           }}>
           {this._renderContent('me')}
         </TabBarItemIOS>
       </TabBarIOS>
     );
   }
 });

 var styles = StyleSheet.create({
   container: {
     flex: 1,
     marginTop: 30,
   },
   tabView: {
     padding: 10,
     backgroundColor: 'rgba(0,0,0,0.01)',
   },
   card: {
     borderWidth: 1,
     backgroundColor: '#fff',
     borderColor: 'rgba(0,0,0,0.1)',
     margin: 5,
     height: 150,
     padding: 15,
     shadowColor: '#ccc',
     shadowOffset: {
       width: 2,
       height: 2
     },
     shadowOpacity: 0.5,
     shadowRadius: 3,
   },
 });
 AppRegistry.registerComponent('TesterHome', () => TesterHome);
