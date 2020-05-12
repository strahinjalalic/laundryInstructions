import React, {useState, useEffect, Component, useRef, useReducer} from 'react';
import {View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import { Camera, requestPermissionsAsync } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import * as ImageManipulator from "expo-image-manipulator";
import BarcodeMask from 'react-native-barcode-mask';

import HeaderFile from '../components/Header';
import {CATEGORIES} from '../data/dummy-data';

const Clarifai = require('clarifai');
const clarifai = new Clarifai.App({
    apiKey: '8f963358c0d74069a60fef940a940aec',
});

process.nextTick = setImmediate;

const ScanMachine = props =>  {
    const {id} = props.route.params;
    const selectedCategory = CATEGORIES.find(cat => cat.id === id);
    const camRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [ratio, setRatio] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [prediction, setPrediction] = useState([]);
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        setRatio('16:9');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    async function takePicture() {
        if(camRef) {
            let data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri);
            return data.uri;
        }
    }

    async function resize(photo) {
        let imageManipulate = await ImageManipulator.manipulateAsync(photo, [{resize: {height: 500, width: 500}}], {base64: true});
        return imageManipulate.base64;
    }

    async function predictions(image) {
        let pred = await clarifai.models.predict({id: "Custom_model", version: "2e44840930924cc9b92ebe6a0d67e2af"}, image);
        return pred;
    }

    async function detectObject() {
        let photo = await takePicture();
        let resized = await resize(photo);
        let predict = await predictions(resized);
        setPrediction(predict.outputs[0].data.concepts)
    }
        return (
            <View style={styles.screen}>
                <Camera style={{ flex: 1, alignItems:'center'}} ref={camRef} ratio={ratio}>
                    { prediction &&
                        <FlatList data={prediction.map(predict => ({
                                key: predict.name,
                            }))} renderItem={({ item }) => (
                                <Text style={styles.text}>{item.key + " "}</Text> 
                            )} numColumns={4} /> 
                    }
                    <BarcodeMask edgeColor={'#62B1F6'} backgroundColor={'transparent'} width={300} height={350} showAnimatedLine={false} />
                    <View style={{flex: 1, justifyContent: 'space-between', justifyContent:'flex-end', margin: 20}}>
                        <TouchableOpacity style={{ backgroundColor: 'transparent', alignSelf: 'flex-end'}} onPress={detectObject}>
                            <FontAwesome name="camera" style={{color: '#fff', fontSize: 40, alignContent: 'flex-start'}} />    
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        );
};                               

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#b8b9db',
    },
    camera: {
        flex: 1,
        width: Dimensions.get('window').height.width / 3,
        height: Dimensions.get('window').height / 3
    },
    preview: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        resizeMode: 'cover',
        justifyContent:'flex-start',
    },
    text: {
        fontSize: 20, 
        color: '#fff',
        paddingLeft: Dimensions.get('window').width / 2 - Dimensions.get('window').width, 
        paddingTop: Dimensions.get('window').height / 20
    }
});

export default ScanMachine;