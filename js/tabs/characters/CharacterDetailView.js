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
var Linking = require('Linking');
var ScrollView = require('ScrollView');
var {getMarvelRequestParam} = require('../../marvelapi/Util');
var Platform = require('Platform');
var MarvelHeader = require('MarvelHeader');

import Hyperlink from 'react-native-hyperlink';

class CharacterDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.handleIconClicked = this.handleIconClicked.bind(this);

  }

  render() {
    var head;
    if(Platform.OS === 'android') {
      head =
      <View style={{flexDirection:'column'}}>
        <View style={{backgroundColor:'rgb(18, 134, 117)', height: 25}}
        />
        <ToolbarAndroid
          title={this.props.character.name}
          titleColor='white'
          navIcon={require("../img/back.png")}
          onIconClicked= {this.handleIconClicked}
          style={styles.toolbar}
        />
      </View>
    } else {
      head = <MarvelHeader title={this.props.character.name} foreground='dark' style={{backgroundColor: 'rgb(18, 134, 117)'}}/>
    }

    return (
      <View style={styles.container}>
        {head}
        <View style={styles.head}>
          <Image style={styles.img} source={{uri: this.props.character.portraitImg}} />
          <View style={{flexDirection: 'column'}} >
            <Text style={styles.title}>
              {this.props.character.name}
            </Text>
            <Text numberOfLines={3} style={styles.description}>
              {this.props.character.description}
            </Text>
            <View style={{flex: 1}}/>
            <Hyperlink linkStyle={{color:'#2980b9'}} onPress={(url) => Linking.openURL(url)}>
              <Text style={styles.wiki}>
                  {'More: '+ this.props.character.wiki}
              </Text>
            </Hyperlink>
          </View>
        </View>
        <ScrollView style={{width: undefined, height: undefined}}>
        <View style={styles.body}>
          {this.renderBody()}
        </View>
        </ScrollView>
      </View>
    );
  }

  handleIconClicked() {
    this.props.navigator.pop();
  }

  renderBody() {
    var body= new Array('Comics', 'Events', 'Series', 'Stories');
    var bodyLayout = body.map((item, index) => {
      var content;
      switch(index) {
        case 0:
          content = this.props.character.comics;
          break;
        case 1:
          content = this.props.character.events;
          break;
        case 2:
          content = this.props.character.series;
          break;
        case 3:
          content = this.props.character.stories;
          break;
      }
      var contentlayout = content.map((item, index) => {
            var generalParam = getMarvelRequestParam();
            var url = `${item.resourceURI}?${generalParam}`;
            var key = `${item.name}-item-${index}`;
            return (<Text key={key} style={styles.bodyItem} onPress={() => Linking.openURL(url)} > { item.name } </Text>);
        }
      );
      var key = `${item.name}-item-${index}`;

      return (
        <View key={key} style={{flexDirection: 'column', marginVertical: 10}}>
          <Text style={styles.bodyTitle}>
            {item}
          </Text>
          <View style={{flexDirection: 'column'}} >
          {contentlayout}
          </View>
        </View>
      );
    });

    return (
      <View style={{flexDirection:'column'}}>
      {bodyLayout}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(244,245,246)',
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
    height: 180,
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
  },

  wiki: {
    fontSize: 15,
    marginBottom: 24,
  },

  body: {
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    height: undefined,
    width: undefined,
    flexDirection: 'column',
    backgroundColor:'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 1,
    elevation: 2,
  },

  bodyTitle: {
    width: undefined,
    height: undefined,
    fontWeight:'bold',
    fontSize: 16,
  },

  bodyItem: {
    width: undefined,
    height: undefined,
    color: 'blue',
  }
});

module.exports = CharacterDetailView;
