import React, {useState, useEffect, Component, useRef, useReducer} from 'react';
import {View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Image, FlatList, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';
import { Camera, requestPermissionsAsync } from 'expo-camera';
import { FontAwesome } from '@expo/vector-icons';
import * as ImageManipulator from "expo-image-manipulator";
import BarcodeMask from 'react-native-barcode-mask';
import Toast, { DURATION } from 'react-native-easy-toast';

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
    const toastRef = useRef();
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
        let pred = await clarifai.models.predict({id: "Custom_model", version: "68d93edf1d504aaea02b8c964ac6f731"}, image);
        return pred;
    }

    async function detectObject(item) {
        let photo = await takePicture();
        let resized = await resize(photo);
        let predict = await predictions(resized);
        setPrediction(predict.outputs[0].data.concepts);
    }

    return (
        <View style={styles.screen}>
            <Camera style={{ flex: 1, alignItems:'center'}} ref={camRef} ratio={ratio}>
                { prediction &&
                    <FlatList data={prediction.slice(0,1).map(predict => ({
                            key: predict.name,
                        }))} renderItem={({ item }) => (
                                toastRef.current.show(<View><Text style={styles.text}>The device is: {item.key + " "}</Text></View>)  
                        )} numColumns={4} /> 
                }
                <BarcodeMask edgeColor={'#62B1F6'} backgroundColor={'transparent'} width={300} height={350} showAnimatedLine={false} />
                <View style={{flex: 1, justifyContent: 'space-between', justifyContent:'flex-end', margin: 20}}>
                    <TouchableOpacity style={{ backgroundColor: 'transparent', alignSelf: 'flex-end'}} onPress={detectObject}>
                        <FontAwesome name="camera" style={{color: '#fff', fontSize: 40, alignContent: 'flex-start'}} />    
                    </TouchableOpacity>
                </View>
            </Camera>
            <Toast ref={toastRef} style={{backgroundColor: '#352d70'}} positionValue={35} position="top" fadeInDuration={800} fadeOutDuration={1000} opacity={0.9} />
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
        color: 'white',
    }
});

export default ScanMachine;