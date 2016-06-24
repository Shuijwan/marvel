/**
* @flow
*/
'use strict';

var MarvelInfoView = require('MarvelInfoView');
var React = require('react');
var View = require('View');
var Text = require('Text');
var F8Touchable = require('F8Touchable');
var StyleSheet = require('StyleSheet');
var ToolbarAndroid = require('ToolbarAndroid');
var Image = require('Image');

class AboutContentView extends React.Component {

  constructor(props) {
    super(props);
    this.handleIconClicked = this.handleIconClicked.bind(this);
  }

  handleIconClicked() {
    this.context.openDrawer();
  }

  render() {
    return (
      <View style={{flex:1, flexDirection:'column'}}>
        <ToolbarAndroid
          navIcon={require('../img/2color.png')}
          title='About'
          titleColor='white'
          onIconClicked= {this.handleIconClicked}
          style={styles.toolbar}
        />
        <Image
          source={require('../img/about_marvel_logo.png')}
        />
        <Text style={styles.itemtext}>
          This is a React Native App based on coolest Marvel API. You can search the Marvel Heros here.
        </Text>
        <F8Touchable style={styles.item}>
          <Text style={styles.itemtext}>
            github: https:\\/\\/github.com\\/Shuijwan\\/marvel
          </Text>
        </F8Touchable>
        <F8Touchable style={styles.item}>
          <Text style={styles.itemtext}>
            marvel: http:\\/\\/developer.marvel.com\\/
          </Text>
        </F8Touchable>
        <MarvelInfoView />
      </View>
    );
  }

}

AboutContentView.contextTypes = {
openDrawer: React.PropTypes.func,
};

var styles = StyleSheet.create({
  item: {
    height: 56,
    width: undefined,
  },

  itemtext: {
    fontSize: 18,
  },

  toolbar: {
    height: 56,
    backgroundColor: 'rgb(168, 31, 26)',//red
    elevation: 2,
    borderRightWidth: 1,
    marginRight: -1,
    borderRightColor: 'transparent',
  },
});

module.exports = AboutContentView;
