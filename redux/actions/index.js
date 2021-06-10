import {USER_ORDERS_STATE_CHANGE, USER_STATE_CHANGE} from '../constants/index'
import {firebase} from '../../firebase/config'


export function fetchUser(){
    return((dispatch) => {
        firebase.firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
                dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
            }
            else{
                alert('Does not exist')
            }
        })
    })
}
export function fetchUserOrders(){
    return((dispatch) => {
        firebase.firestore()
        .collection("orders")
        .doc(firebase.auth().currentUser.uid)
        .collection("userOrders")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
            let orders = snapshot.docs.map(doc =>{
                const data = doc.data();
                const id = doc.id;
                return{id, ...data}
            })
            dispatch({type: USER_ORDERS_STATE_CHANGE, orders})
        })
    })
}

// export function signOut(){
//     return((dispatch) => {
//         firebase.auth()
//         .signOut()
//         .then(() => {
//             dispatch({type: USER_STATE_CHANGE, currentUser: null})
//             alert('Logged out')
//         })
//         .catch((error) => {
//             console.error(error);
//         })
//     })
// }