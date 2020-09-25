import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import { TextInput } from 'react-native-gesture-handler';




export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedbookid : '',
            scannedstudentid : '',
            buttonState:'normal',
        }
    }

    getCameraPermission=async(id)=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA);

        this.setState({
            hasCameraPermissions: status==="granted",
            buttonState: "clicked"
        });
    }
    handleBarCodeScanned=async({type,data})=>{
    const {buttonState} = this.state
        this.setState({
            scanned:true,
            scannedbookid:data,
            buttonState:'normal'
        });    
    }
render(){
    const hasCameraPermissions=this.state.hasCameraPermissions;
    const scanned=this.state.scanned;
    const buttonState=this.state.buttonState;
    if(buttonState === "clicked"){
        return(
            <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}/>
        );
    }
    else if(buttonState === "normal"){
return(
    <View style={styles.container}>
        <Image
          source={require("../assets/Barcode.jpg")}
          style={{width:150, height:150}}
        />
        <Text>
            {hasCameraPermissions === true ? this.state.scannedbookid : "Request camera Permissions"}
        </Text>
        <TouchableOpacity
        onPress={this.getCameraPermission}
        style={styles.scanButton}>
            <Text style={styles.buttonText}> Scan Qr Code</Text>
        </TouchableOpacity>
    </View>
      );
    }
  }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline'
    },
    scanButton:{
        backgroundColor:'#2196F3',
        width : 150,
        borderWidth:1.5
    },
    buttonText:{
        fontSize:20,
        textAlign:'center'
    },
    inputview : {
        flexDirection : 'row',
        margin : 20,
    },
    inputbox:{
        width:200,
        height:40,
        borderWidth : 1.5,
        borderRightWidth: 0,
        fontSize:20
    }
})