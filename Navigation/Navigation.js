import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import Login from '../Screens/Login';
import Tasks from '../Screens/Tasks';
import Task from '../Screens/Task';

const Stack = createStackNavigator();

export default function navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="login">  
                <Stack.Screen name="login" component={Login} options={{ title: 'Iniciar sesión' }} />
                <Stack.Screen name="tasks" component={Tasks} options={{ title: 'Listado de Tareas' }} />
                <Stack.Screen name="task" component={Task} options={{ title: 'Crear Tarea' }} />
            </Stack.Navigator>
           
        </NavigationContainer>
    )
}
