/**
* @providesModule MarvelApp
* @flow
*/

'use strict';

var React = require('react');
// var AppState = require('AppState');
var SplashScreen = require('./splash/SplashScreen');
var MarvelNavigator = require('./MarvelNavigator');
var StatusBar = require('StatusBar');
var StyleSheet = require('StyleSheet');
var View = require('View');

var {connect} = require('react-redux');
var { getPopularCharacters } = require('./actions');

class MarvelApp extends React.Component {
  componentDidMount() {
    // AppState.addEventListener('change', this.handleAppStateChange);
    this.props.dispatch(getPopularCharacters());
  }

  componentWillUnmount() {
    // AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if(appState == 'active') {

    }
  }

  render() {
    var content;
    if(this.props.inSplash) {
      content = <SplashScreen />;
    } else {
      content = <MarvelNavigator />;
    }

    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="rgba(0,0,0,0.2)"
          barStyle="light-content"
          />
        {content}
      </View>
    );
  }
}

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
