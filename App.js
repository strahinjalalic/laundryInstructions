import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Alert,  Image, Dimensions } from 'react-native';
import {DefaultTheme, DarkTheme, Button, Provider as PaperProvider, Divider} from 'react-native-paper';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { NavigationContainer, NavigationRouteContext, DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-navigation';
import { DrawerItemList, DrawerItem, createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import {Icon} from 'native-base';


import bigHouseMachines from './screens/bigHouseMachines';
import smallHouseMachines from './screens/smallHouseMachines';
import ScanMachine from './screens/scanMachine';
import CustomDrawer from './components/Navigation';

import HeaderFile from './components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import { startClock } from 'react-native-reanimated';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Home({navigation}) {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <HeaderFile navigation={navigation} title="Home"/>
      </View>
    </PaperProvider>
  )
}

function StackNav() {
  return(
    <Stack.Navigator headerMode={"none"}>
      <Stack.Screen name="bigMachines" component={bigHouseMachines} />
      <Stack.Screen name="Skeniraj" component={ScanMachine} />
    </Stack.Navigator>
  )
}

function StackNavSmall() {
  return(
    <Stack.Navigator headerMode={"none"}>
      <Stack.Screen name="smallMachines" component={smallHouseMachines} />
      <Stack.Screen name="Skeniraj" component={ScanMachine} />
    </Stack.Navigator>
  )
}

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Veliki kucni aparati" component={StackNav} />
      <Drawer.Screen name="Mali kucni aparati" component={StackNavSmall} />
    </Drawer.Navigator>
  );
}



export default function App() {
  return(
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b9db',
  },
  imageAndText: {
    flexDirection: 'row'
  },
  buttonStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    width: '20%',
    color: 'white'
  },
  header: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 10,
    paddingTop: 35,
    backgroundColor: '#1a2369',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
