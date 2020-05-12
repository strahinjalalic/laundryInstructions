import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import HeaderFile from '../components/Header';

import ScanMachine from './scanMachine';
import { CATEGORIES_SMALL } from '../data/smallMachines';
import CategoryGrid from '../components/CategoryGrid';

const smallHouseMachines = (props) => {
    const renderGridItem = (itemData) => {
        return (
            <CategoryGrid title={itemData.item.title} image={itemData.item.image} onSelect={() => props.navigation.navigate("Skeniraj", {
                id: itemData.item.id
            })}  />
        )
    }

    return (
        <View style={styles.screen}>
            <View>
                <HeaderFile navigation={props.navigation} title="Select your device" />
            </View>
            <View>
                <FlatList data={CATEGORIES_SMALL} renderItem={renderGridItem} numColumns={2} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

export default smallHouseMachines;