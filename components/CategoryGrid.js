import * as React from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Dimensions, Image} from 'react-native';


const CategoryGrid = props => {
    return(
        <TouchableOpacity style={styles.gridItem} onPress={props.onSelect}>
            <View>
                <Image source={props.image} style={styles.image}  />
                <Text style={{marginTop: 10}}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        marginTop: Dimensions.get('window').height / 18,
        margin: Dimensions.get('window').height /27,
        height: Dimensions.get('window').height / 3
    },
    image: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').height / 4
    }
});

export default CategoryGrid;