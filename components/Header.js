import React, { Component, PureComponent } from 'react';
import { StyleSheet, View, Dimensions, Image, ActivityIndicator, Text } from 'react-native';
import Expo from 'expo';
import * as Font from 'expo-font';
import { withNavigation } from 'react-navigation';
import { DrawerActions } from '@react-navigation/drawer';
import { Container, Header, Left, Body, Right, Button, Icon } from 'native-base';

import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppLoading } from 'expo';
import { render } from 'react-dom';


const HeaderFile = props => { 
  return(
    <Header>
      <Left>
        <Button transparent onPress={() => props.navigation.openDrawer()}>
          <Icon type="Feather" name='menu' />
        </Button>
      </Left>
      <Body>
        <Text style={headerStyle.headerTitle}>{props.title}</Text>
      </Body>
    </Header>
  );
}

const headerStyle = StyleSheet.create({
  header: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 11,
    paddingTop: 35,
    backgroundColor: '#1a2369',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  headerTitle: {
      color: 'white',
      fontSize: 18,
      right: "20%"
  },
  image: {
    alignItems: 'center',
    justifyContent:'center',
    marginRight: 5
  },
});

export default HeaderFile;