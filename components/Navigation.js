import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Alert, ScrollView, Image, Dimensions, TouchableNativeFeedback } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Divider } from 'react-native-paper';
import { DrawerItemList, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { ColorPalette } from 'react-native-color-palette';
import { Icon } from 'react-native-vector-icons/FontAwesome';

class CustomDrawer extends Component {
    render() {
      const { theme, user } = this.props;
      const ripple = TouchableNativeFeedback.Ripple('#adacac',  false);
      return (
        <View style={{flex: 1, backgroundColor: '#ccd4db'}}>
            <ScrollView>
              <SafeAreaView style={styles.container} forceInset={{top: 'never', horizontal:'never'}}>
                <View style={styles.header}>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#f9f9f9', marginBottom: '10%', paddingRight: '37%'}}> Menu </Text>
                  </View>
                </View>
                <DrawerItemList {...this.props} />
                <View>
                  <View style={{marginTop: '2%'}}>
                  </View>
                  <View style={{ marginTop: '5%' }}>
                    <Divider style={{ backgroundColor: '#000' }} />
                  </View>
                </View>
              </SafeAreaView>
            </ScrollView>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccd4db'
    }, 
    header: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 12,
        paddingTop: 35,
        backgroundColor: '#1a2369',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
});

export default CustomDrawer;