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
var {isPopularCharacter, writeCharacterToRealm } = require('../../marvelapi/realmModel');
var Platform = require('Platform');
var MarvelHeader = require('MarvelHeader');
var TouchableHighlight = require('TouchableHighlight');
var {connect} = require('react-redux');
var ActivityIndicator = require('ActivityIndicator');

var {markAsPopularCharacter, getCharacterDetail} = require('../../actions');

import Hyperlink from 'react-native-hyperlink';

class CharacterDetailView extends React.Component {
  state: {
    isLoading: boolean;
  };

  handleIconClicked: () => void;

  constructor(props) {
    super(props);
    this.handleIconClicked = this.handleIconClicked.bind(this);
    this.state = {
      isLoading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.detailUrl) {
       this.setState({isLoading: false});
      Linking.openURL(nextProps.detailUrl)
    }
  }

  render() {
    var head;
    if(Platform.OS === 'android') {
      head = <MarvelHeader title={this.props.character.name} leftItem={{icon: require("../img/back.png"), onPress: this.handleIconClicked}} foreground='light' style={{backgroundColor: 'rgb(18, 134, 117)'}}/>
    } else {
      head = <MarvelHeader title={this.props.character.name} foreground='dark' style={{backgroundColor: 'rgb(18, 134, 117)'}}/>
    }

    var isPopular;
    var star = require('../img/unstar.png');
    if(isPopular = isPopularCharacter(this.props.character)) {
      star = require('../img/star.png');
    }

    var loading;
    if(this.state.isLoading) {
      loading =  <ActivityIndicator style={styles.loading}/>;
    }

    return (
      <View style={styles.container}>
        {head}
        <View style={styles.head}>
          <Image style={styles.img} source={{uri: this.props.character.portraitImg}} />
          <View style={{flexDirection: 'column', flex: 1}} >
            <View style={{flexDirection: 'row', marginTop: 15, marginBottom: 10, justifyContent:'space-between'}}>
              <Text style={styles.title}>
                {this.props.character.name}
              </Text>
              <TouchableHighlight style={{width: 32, height: 32, alignItems: 'center', marginRight: 10}} underlayColor={'rgba(255,255,255, 0.2)'} onPress={() => {this.props.dispatch(markAsPopularCharacter(this.props.character, !isPopular)); this.forceUpdate();}}>
                <Image style={styles.star} source={star} />
              </TouchableHighlight>
            </View>
            <Text numberOfLines={3} style={styles.description}>
              {this.props.character.description}
            </Text>
            <View style={{flex: 1}}/>
            <Hyperlink linkStyle={{color:'#2980b9'}} onPress={(url) => Linking.openURL(url)}>
              <Text style={styles.wiki} numberOfLines={1}>
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
        {loading}
      </View>
    );
  }

  handleIconClicked() {
    this.props.navigator.pop();
  }

  renderBody() {
    var body= ['Comics', 'Events', 'Series', 'Stories'];
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
            var key = `${item.name}-item-${index}`;
            return (<Text key={key} style={styles.bodyItem} onPress={() =>{ this.setState({isLoading: true}); this.props.dispatch(getCharacterDetail(item.resourceURI))}} > { item.name } </Text>);
        }
      );
      var key = `${item}`;

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
    fontSize: 18,
    fontWeight:'bold',
    alignItems: 'center',
    width: 200,
    flex: 1,
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
  },

  star: {
    width: 24,
    height: 24,
  },

  loading: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
});

function select(store) {
    return {
      detailUrl: store.marvel.detailUrl,
    };
}

module.exports = connect(select)(CharacterDetailView);
