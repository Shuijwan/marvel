/**
* @flow
*/
'use strict';

var React = require('React');
var Text = require('Text');
var View = require('View');
var ToolbarAndroid = require('ToolbarAndroid');
var StyleSheet = require('StyleSheet');
var TextInput = require('TextInput');
var Image = require('Image');
var {connect} = require('react-redux');
var ListView = require('ListView');
var TouchableHighlight = require('TouchableHighlight');
var RecyclerViewBackedScrollView = require('RecyclerViewBackedScrollView');
var MarvelHeader = require('MarvelHeader');
var {windowWidth} = require('constant');
var Platform = require('Platform');

import ActionButton from 'react-native-action-button';
import type {Character} from '../../marvelapi/model';

var batman = require('../img/batmancolor.png');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class CharactersContentView extends React.Component {

  handleIconClicked: () => void;
  renderRow: (rowData: any, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) => React.Element<View>;

  constructor(props: any) {
    super(props);
    this.handleIconClicked = this.handleIconClicked.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  render() {
    if(this.props.characters && this.props.characters.length > 0) {
      ds = ds.cloneWithRows(this.props.characters);
    }

    var actionButton;
    var head;

    if(Platform.OS === 'android') {
      head = <MarvelHeader title={'CHARACTERS'} leftItem={{icon: batman, onPress: this.handleIconClicked}} foreground='light' style={{backgroundColor: 'rgb(18, 134, 117)'}}/>

      actionButton = <ActionButton
        buttonColor="rgb(18, 134, 117)"
        onPress={() => { this.handleSearchIconClicked()}}
      />;
    } else {
      head = <MarvelHeader title={'POPULAR HEROS'} foreground='dark' style={{backgroundColor: 'rgb(18, 134, 117)'}}/>
    }

    return (
      <View style={styles.container}>
        {head}
        <ListView
          style={{flex:1, width: undefined, height: undefined}}
          dataSource={ds}
          renderRow={this.renderRow}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
        />
        {actionButton}
      </View>
    );
  }

  handleCharacterClicked(selectedItem: Character) {
    this.props.navigator.push({ character: selectedItem });
  }

  renderRow(rowData: Character, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
      return (
        <TouchableHighlight  underlayColor='rgba(255,255,255, 0.2)' style={{backgroundColor:'rgb(244,245,246)'}} onPress={() => {
            highlightRow(sectionID, rowID);
            this.handleCharacterClicked(rowData);
          }}>
            <View style={styles.row}>
              <Image style={styles.thumb} source={{uri: rowData.thumbnail}} />
              <View style={{flexDirection: 'column'}} >
                <Text style={styles.title}>
                  {rowData.name}
                </Text>
                <Text numberOfLines={2} style={styles.text}>
                  {rowData.description}
                </Text>
              </View>
            </View>
        </TouchableHighlight>
      );
  }

  handleIconClicked() {
    this.context.openDrawer();
  }

  handleSearchIconClicked() {
    this.props.navigator.push({ search: "search hero" });
  }
}

CharactersContentView.contextTypes = {
  openDrawer: React.PropTypes.func,
};

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

  searchbox: {
    height: 56,
    width: 290,
    alignSelf: 'center',
    fontSize: 15,
  },

  row: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    height: 100,
    width: undefined,
    flexDirection: 'row',
    backgroundColor:'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 1,
    elevation: 2,
  },

  thumb: {
    width: 80,
    height: undefined,
    alignItems: 'center',
    resizeMode:Image.resizeMode.contain,
    marginRight: 10,
  },

  title: {
    marginTop: 15,
    fontSize: 18,
    fontWeight:'bold',
  },

  text: {
    fontSize: 16,
    paddingRight: 5,
    width: windowWidth-130,//TODO, how to let Text autofit the view width?
  }
});

function select(store) {
  return {
    characters: store.marvel.popularcharacters,
  };
}

module.exports = connect(select)(CharactersContentView);
