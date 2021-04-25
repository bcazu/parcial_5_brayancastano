import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Image, Input } from 'react-native-elements'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import Loading from '../Components/Loading'
import { loginWithEmailAndPassword } from '../utils/actions'
import { validateEmail } from '../utils/helpers'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Login({ navigation, route }) {
    const defaultFormValues = ()=>{
        return {
            email: "tres@yopmail.com",
            password: "123456",
        }
    };
    const [loading, setloading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [errorEmail, seterrorEmail] = useState("");
    const [errorPassword, seterrorPassword] = useState("");
    const [formData, setformData] = useState(defaultFormValues());
    let validateData = ()=>{
        seterrorEmail("");
        seterrorPassword("");
        let isValid = true;
        if(!validateEmail(formData.email)){
            seterrorEmail("Debes usar un email válido");
            isValid = false;
        }
        if(isEmpty(formData.password)){
            seterrorPassword("Debes ingresar tu contraseña");
            isValid = false;
        }
       
        return isValid;
    }
    const onChange = (e, type)=>{
        setformData({...formData, [type]: e.nativeEvent.text});
       
    }
    let doLogin = async ()=>{
        if(!validateData()) return
        setloading(true);
        const result = await loginWithEmailAndPassword(formData.email, formData.password);
        setloading(false);
        if(!result.statusResponse){
            seterrorEmail(result.error);
            seterrorPassword(result.error);
            return;
        }
        navigation.navigate('tasks');
    }
    return (
        <KeyboardAwareScrollView style={styles.container}> 
            <Avatar
                source={require('../assets/logo.png')}
                style={styles.img}
                resizeMode="contain"

            />
            <View style={styles.contInputs}>
                <Input
                    placeholder="Ingresa email..."
                    keyboardType="email-address"
                    onChange={(e)=> onChange(e, "email")}
                    errorMessage={errorEmail}
                    defaultValue={formData.email}
                    style={styles.input}
                />
                <Input
                    style={styles.input}
                    onChange={(e)=> onChange(e, "password")}
                    placeholder="Ingresa contraseña..."
                    password={true}
                    secureTextEntry={!showPassword}
                    errorMessage={errorPassword}
                    defaultValue={formData.password}
                    rightIcon={
                        <Icon
                            type="material-community"
                            name={ showPassword ? "eye-off" : "eye" }
                            color="#628ba3"
                            onPress={() => setShowPassword(!showPassword)}
                        />
                    }
                />
            </View>
             <Button
                title="Iniciar Sesión"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={()=>doLogin()}
            />
            <Loading isVisible={loading} text="Iniciando sesión"/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#e5c45f'
    },
    img: {
        alignSelf: 'center',
        width:  300,
        height: 300,
    },
    btn:{
        backgroundColor: '#628ba3',
        textAlign:'center',
        alignSelf: 'center',
        width: '85%'
    },
    contInputs:{
        marginTop: 30,
    },
    input:{
        color: '#628ba3',
        fontWeight: 'bold'
    },

})
