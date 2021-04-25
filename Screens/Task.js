import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { addDocumentWithoutId, updateDocument, deleteDocument } from '../utils/actions'
import Modal from '../Components/Modal'
import Loading from '../Components/Loading'

export default function Task({navigation, route}) {
    let {task,title,mode} = route.params;
    const [form, setForm] = useState(JSON.parse(JSON.stringify(task)))
    const [showModal, setShowModal] = useState(false)
    const [errorName, setErrorName] = useState('')
    const [loading, setloading] = useState(false)
    
    useEffect(() => {
        navigation.setOptions({ title: title })
    }, )
    let validateData = ()=>{
        setErrorName("");
        let isValid = true;
        if(isEmpty(form.name)){
            setErrorName("No puedes dejar el nombre de la tarea vacio");
            isValid = false;
        }
       
        return isValid;
    }
    const onChange = (e, type)=>{
        setForm({...form, [type]: e.nativeEvent.text});
    }
    const configureTask = async (mode)=>{
        setloading(true)
        if(validateData()){
            if(mode == 'add'){
                const responseCreate = await addDocumentWithoutId('tasks', form);
                if(responseCreate){
                    navigation.goBack()
                    return
                }
            }
            const responseUpdate = await updateDocument('tasks', form.id, form) 
            if(responseUpdate.statusResponse) navigation.goBack();
            return
        }
        setloading(false)
        return
    }
    const completeTask = async ()=>{
        setloading(true)
        const response = await deleteDocument('tasks',form.id)
        if(response.statusResponse){
            setShowModal(false)
            navigation.goBack();
        }
        setloading(false)
    }
    const renderComponent = ()=>{
        return (
            <View>
                  <Text
                    style={{
                      color: '#C0C0C0',
                      fontSize: 18,
                      marginLeft: 10,
                      marginBottom: 30,
                      textAlign: 'center'
                    }}
                  >
                   ¿Estás seguro que desas completar la tarea?
                  </Text>
                  <View
                    style={{flexDirection:'row', alignSelf:'center'}}
                  >
                      <Button
                        title="Completar tarea"
                        containerStyle={styles.btnContainerModal}
                        buttonStyle={styles.btnCreate}
                        onPress={()=>{
                            completeTask();
                        }}
                      />
                      <Button
                        title="Cancelar"
                        containerStyle={styles.btnContainer}
                        buttonStyle={styles.btnDone}
                        onPress={()=>setShowModal(false)}
                      />
                  </View>
                </View>
        )
    }
    return (
        <View style={styles.containner}>
            <Text style={styles.name}>Nombre de Tarea</Text>
            <Input
                placeholder="Tarea ..."
                onChange={(e)=> onChange(e, "name")}
                errorMessage={errorName}
                defaultValue={form.name}
                style={styles.input}

            />
             <Button
                title={title}
                containerStyle={styles.btnContainerCreate}
                buttonStyle={styles.btnCreate}
                onPress={()=>configureTask(mode)}
            />
            {
                mode == 'update' &&
                (
                    <Button
                        title="Completar tarea"
                        containerStyle={styles.btnContainerDone}
                        buttonStyle={styles.btnDone}
                        onPress={()=>setShowModal(true)}
                    />
                )
            }
            <Modal isVisible={showModal} setVisible={setShowModal} >
                {
                    renderComponent()
                }
            </Modal>
            <Loading isVisible={loading} text="Procesando.."/>
        </View>
    )
}

const styles = StyleSheet.create({
    containner:{
        flex:1,
        backgroundColor: '#e5c45f'
    },
    input:{
        color: '#628ba3',
        fontWeight: 'bold'
    },
    name:{
        fontSize: 24,
        color: '#FFFF',
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 200
    },  
    btnContainerCreate:{
        marginBottom: 10,
        width: '85%',
        alignSelf: 'center'
    },
    btnContainerDone:{
        width: '85%',
        alignSelf: 'center'
    },
    btnCreate:{
        backgroundColor: '#628ba3'
    },
    btnDone:{
        backgroundColor: '#db5c54'
    },
    btnContainerModal:{
        marginRight: 10
    }
})
