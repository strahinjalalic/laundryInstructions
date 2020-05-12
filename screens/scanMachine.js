import React, {useState, useEffect, Component, useRef, useReducer} from 'react';
import {View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
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

// const concept = clarifai.inputs.create({
//     url:  "https://static.tehnomanija.rs/UserFiles/category_images/359.png",
//     concepts: [
//         {
//             id: "Ves Masine",
//             value: true
//         }
//     ]
// });

// const model = clarifai.models.create(
//         "CUSTOM_MODEL",
//         [
//             {
//                 "id" : "Ves Masine"
//             }
//         ]
//     ).then(function(response) {
//         // let model_id = response['Model']['id'];
//         // return model_id;
//         let id = response['id'];

//     });

//     const train = clarifai.models.train(id).then(function(response, image) {
//         let modelV = response['modelVersion']['id'];
//         let pred = clarifai.models.predict({id: id, version: modelV}, image);
//         return pred;
//     });

const ScanMachine = props =>  {
    const {id} = props.route.params;
    const selectedCategory = CATEGORIES.find(cat => cat.id === id);
    const camRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [ratio, setRatio] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [prediction, setPrediction] = useState([]);
    
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
            //console.log(data);
            setCapturedPhoto(data.uri);
            return data.uri;
        }
    }

    async function resize(photo) {
        let imageManipulate = await ImageManipulator.manipulateAsync(photo, [{resize: {height: 350, width: 300}}], {base64: true});
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
        <View style={{ flex: 1}}>
            <Camera style={{ flex: 1, alignItems:'center'}} ref={camRef} ratio={ratio}>
                <View style={{ flex: 1, backgroundColor: 'transparent', margin: 20, justifyContent: 'space-between'}}>
                 {prediction &&  <FlatList data={prediction.map(predict => ({
                        key: predict.name,
                    }))} renderItem={({ item }) => (
                       <Text style={{fontSize: 17, color: '#fff'}}>{item.key + " "}</Text>
                    )} numColumns={4} /> } 
                    </View>
                    <BarcodeMask edgeColor={'#62B1F6'} backgroundColor={'transparent'} width={300} height={350} showAnimatedLine={false} />
                    <View style={{flex: 1, justifyContent: 'space-between', justifyContent:'flex-end', margin: 20}}>
                        <TouchableOpacity style={{ backgroundColor: 'transparent', alignSelf: 'flex-end'}} onPress={detectObject}>
                            <FontAwesome name="camera" style={{color: '#fff', fontSize: 40, alignContent: 'flex-start'}} />    
                        </TouchableOpacity>
                        </View>
            </Camera>
            {/* { capturedPhoto &&
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20}}>
                        <Image style={{width: '100%', height: '100%', borderRadius: 10}} source={{uri: capturedPhoto}} />
                    </View> } */}
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
    }
});

export default ScanMachine;