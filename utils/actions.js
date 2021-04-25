import { firebaseApp } from './firebase'
import firebase from 'firebase'
import 'firebase/firestore'


const db = firebase.firestore(firebaseApp)

export const isUserLogged = () => {
    let isLogged = false

    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged = true)
    })

    return isLogged
}

export const getCurrentUser = () => {
    return firebase.auth().currentUser;
}

export const closeSession = () => {
    return firebase.auth().signOut()
}

export const loginWithEmailAndPassword = async(email, password) => {
    const result = { statusResponse: true, error: null}
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Usuario o contraseña no válidos."
    }
    return result
}

export const addDocumentWithoutId = async(collection, data) => {
    const result = { statusResponse: true, error: null, idDocument:null }
    try {
       const response = await db.collection(collection).add(data)
       result.idDocument= response.id
    } catch (error) {
        result.statusResponse = false
        result.error = error
        console.log("ERROR",error)
    }
    return result     
}

export const updateDocument = async(collection, id, data) => {
    const result = { statusResponse: true, error: null }
    try {
        await db.collection(collection).doc(id).update(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
        console.log("ERROR",error)
    }
    return result     
}
export const deleteDocument = async(collection, id) => {
    const result = { statusResponse: true, error: null }
    try {
        await db.collection(collection).doc(id).delete()
        console.log('Documento eliminado')
    } catch (error) {
        result.statusResponse = false
        result.error = error
        console.log("ERROR",error)
    }
    return result     
}

export const getTasks = async(collection, key, idUser)=>{
    const result = {
        statusResponse: true,
        error: null,
        tasks: [],
        startInsitutition: null
    }
    try {
        const response = await db
        .collection(collection)
        .where(key, "==", idUser)
        .get();
        response.forEach((doc)=>{
            const tasks = doc.data();
            tasks.id = doc.id;
            result.tasks.push(tasks);
        })
    } catch (error) {
        result.error = error;
        result.statusResponse = false;
        console.log('ERROR', error)
    }
    return result;
}
