import React from 'react'
import { ActivityIndicator } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'

export default function Loading({isVisible, text}) {
    return (
        <Overlay
            isVisible={isVisible}
            windowBackgroundColor="rgba(54,56,68,0.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlay}
        >
            <View style={styles.view}>
                <ActivityIndicator 
                    size="large"
                    color="#25C3C9"
                />
                {
                    text && <Text style={styles.text}>{text}</Text>
                }
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        height:100,
        width:210,
        backgroundColor: "#fff",
        shadowColor: "#989898",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.50,
        shadowRadius: 2,
        elevation: 2,
        borderRadius:50
    },
    view:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    text:{
        color:"#1E8DB2",
        marginTop:10
    }
})
