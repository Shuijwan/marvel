/**
* @flow
*/

'use strict';
var React = require('react');
var StyleSheet = require('StyleSheet');
var Animated = require('Animated');
var Image = require('Image');
var {connect} = require('react-redux');
var View = require('View');

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anim : new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.anim, {toValue:3000, duration:3000}).start();
  }

  render() {
    return (
      <Animated.Image style={[styles.container, this.fadeIn(0, 0)]}
        source={require('./img/splash-background.jpg')}>
        <View style={{flex:1}}/>
        <Animated.Image style={[styles.logo, this.fadeIn(2500, 20)]}
        source={require('./img/marvel-logo.png')}
        />
      </Animated.Image>
    );
  }

  fadeIn(delay, from=0) {
    const {anim} = this.state;
    return {
      opacity: anim.interpolate({
        inputRange:[delay, Math.min(delay + 500, 3000)],
        outputRange:[0, 1],
        extrapolate:'clamp',
      }),

      transform: [{
        translateY: anim.interpolate({
          inputRange:[delay, Math.min(delay+500, 3000)],
          outputRange:[from, 0],
          extrapolate:'clamp',
        }),
      }],
    };
  }
}

var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'transparent',
    width: undefined,
    height: undefined,
    flexDirection: 'column',
  },

  logo: {
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
});

module.exports = connect()(SplashScreen);
