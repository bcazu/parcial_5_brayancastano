import React, {useState, useEffect, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { getCurrentUser, getTasks, closeSession } from '../utils/actions';
import Loading from '../Components/Loading';
import { firebaseApp } from '../utils/firebase';
import { Button, Icon, ListItem } from 'react-native-elements';
import Login from './Login';

export default function Tasks({navigation}) {
    const [loading, setloading] = useState(false)
    const [login, setlogin] = useState(false)
    const [user, setuser] = useState(null)
    const [tasks, settasks] = useState([])
    useEffect(() => {
       
        firebaseApp.auth().onAuthStateChanged((userInfo)=>{
            userInfo ? setlogin(true) : setlogin(false);
        //  !login &&  navigation.navigate('login')
        
        })
     }, [])
    useFocusEffect(
        useCallback(() => {
            (async()=>{
                setloading(true);
                const responseUser = getCurrentUser()
                setuser(responseUser)
                const result = await getTasks('tasks', 'userId', getCurrentUser().uid)
                if(result.statusResponse){
                   settasks(result.tasks)
                }
                setloading(false);
            })()
        }, [])
    )
    if(user){
        return (
            <View style={{flex:1, backgroundColor:'#e5c45f'}}>
                <Text style={styles.h1}>Bienvenido {user.email}</Text>
                {
                    tasks.length > 0 ?
                    tasks.map((task, i) => (
                        <ListItem 
                           
                            containerStyle={{backgroundColor: '#db5c54'}}
                            key={i} 
                            bottomDivider
                            onPress={()=>{
                                navigation.navigate('task', {
                                    mode: 'update',
                                    task,
                                    title: 'Actualizar Tareas'
                                  })
                            }}
                        >
                        <ListItem.Content>
                            <ListItem.Title style={{color:'#FFFF'}}>{task.name}</ListItem.Title>
                        </ListItem.Content>
                        </ListItem>
                    ))
                    :
                        <Text style={{
                            color: '#FFFF',
                            fontSize: 20,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginVertical: '50%',
                            marginHorizontal: 50
                        }}>No tienes tareas pendientes ¿Qué esperas para programarte?</Text>
                }
                <Icon
                    type='material-community'
                    name='plus'
                    color='#628ba3'
                    reverse
                    containerStyle={styles.btnContainer}
                    onPress={()=>navigation.navigate('task', {
                        mode: 'add',
                        task:{userId: user.uid },
                        title: 'Crear Tarea'
                    })}
                />
                <Icon
                    type='material-community'
                    name='exit-run'
                    color='#db5c54'
                    reverse
                    containerStyle={styles.btnExit}
                    onPress={()=>{
                        closeSession()
                        navigation.goBack()

                    }}
                />
                <Loading isVisible={loading} text="Obteniendo tareas..."/>
            </View>
        )
    }else{
       return ( 
            <View>
                <Loading isVisible={loading} text="Obteniendo tareas..."/>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    btnContainer:{
        position:'absolute',
        bottom:70,
        right:10,
        shadowColor: 'black',
        shadowOffset: {width:2,height:2},
        shadowOpacity: 0.1
    },
    h1:{
        fontWeight:'bold',
         alignSelf:'center',
         fontSize: 24,
         marginBottom: 20,
         color:'#628ba3',
         marginTop: 20,
    },
    btnExit:{
        position:'absolute',
        bottom:10,
        right:10,
        shadowColor: 'black',
        shadowOffset: {width:2,height:2},
        shadowOpacity: 0.1
    }
})
