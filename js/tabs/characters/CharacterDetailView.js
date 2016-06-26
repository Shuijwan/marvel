/**
* @flow
*/

'use strict';

var React = require('react');
var StyleSheet = require('StyleSheet');
var View = require('View');
var ToolbarAndroid = require('ToolbarAndroid');
var Image = require('Image');
var {windowWidth} = require('constant');
var Text = require('Text');


class CharacterDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.handleIconClicked = this.handleIconClicked.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:'rgb(18, 134, 117)', height: 25}}
        />
        <ToolbarAndroid
          title={this.props.character.name}
          titleColor='white'
          navIcon={require("../img/back.png")}
          onIconClicked= {this.handleIconClicked}
          style={styles.toolbar}
        />
        <View style={styles.head}>
          <Image style={styles.img} source={{uri: this.props.character.portraitImg}} />
          <View style={{flexDirection: 'column'}} >
            <Text style={styles.title}>
              {this.props.character.name}
            </Text>
            <Text numberOfLines={3} style={styles.description}>
              {this.props.character.description}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  handleIconClicked() {
    this.props.navigator.pop();
  }
}

var styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  toolbar: {
    height: 56,
    backgroundColor: 'rgb(18, 134, 117)',//green
    elevation: 2,
    borderRightWidth: 1,
    marginRight: -1,
    borderRightColor: 'transparent',
  },

  head: {
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    height: 200,
    width: undefined,
    flexDirection: 'row',
    backgroundColor:'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 1,
    elevation: 2,
  },

  img: {
    width: 120,
    height: undefined,
    alignItems: 'center',
    resizeMode:Image.resizeMode.contain,
    marginRight: 10,
  },

  title: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 18,
    fontWeight:'bold',
  },

  description: {
    fontSize: 16,
    paddingRight: 5,
    width: windowWidth-130,//TODO, how to let Text autofit the view width?
  }
});

module.exports = CharacterDetailView;
