/**
* @providesModule MarvelApp
* @flow
*/

'use strict';

var React = require('react');
var AppState = require('AppState');
var SplashScreen = require('./splash/SplashScreen');
var MarvelNavigator = require('./MarvelNavigator');
var StatusBar = require('StatusBar');
var StyleSheet = require('StyleSheet');
var View = require('View');

var {connect} = require('react-redux');
var { getAllCharacters } = require('./actions');

var MarvelApp = React.createClass({
  componentDidMount: function() {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.props.dispatch(getAllCharacters(0, 1));
  },

  componentWillUnmount: function() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  },

  handleAppStateChange: function(appState) {
    if(appState == 'active') {

    }
  },

  render: function() {
    if(this.props.inSplash) {
      return <SplashScreen />;
    }

    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0,0,0,0.2)"
          barStyle="light-content"
          />
        <MarvelNavigator />
      </View>
    );
  },

});

var styles = StyleSheet.create({
  container:{
    flex: 1,
  },
});

function select(store) {
  return {
    inSplash: store.mainentry.inSplash,
  };
}

module.exports = connect(select)(MarvelApp);
