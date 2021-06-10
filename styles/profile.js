import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
      backgroundColor: 'white',
      width:'100%' 
    },
    logoContainer: {
        height: 200,
        backgroundColor:'white',
    },
    fieldsContainer: {
        flexDirection: 'row',
        height: 30,
        marginBottom:30,
        backgroundColor:'white',
        width:'100%'   
    },
    textContainer: {
        alignItems: 'flex-start', 
        backgroundColor:'white',
        marginTop:10,
        marginLeft:30,
        height: '100%',
        width:'50%'    },
    lableContainer: {
        alignItems: 'flex-start', 
        backgroundColor:'white',
        height: '100%',
        marginLeft:30,
        marginTop:5,
        width:'50%'   
    },
    editButton: {
        backgroundColor: '#191970',
        height: 48,
        width:'100%',
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    text: {
        fontSize:20,
        color: 'steelblue'
    },
    email: {
        fontSize:20,
        color: 'steelblue'
    },
    textLable: {
        fontSize:26,
        color: '#191970',
        fontWeight: "bold"
    },
    bodyTitle: {
        fontSize: 30,
        fontWeight: 'bold',   
        marginBottom: 20,
        color: '#191970'
    },  
    bodyTitleView: {
        flexDirection: 'row',
        backgroundColor:'white',
        height: 50,
        alignItems: 'center',    
        justifyContent: 'center'
    },  
    header: {
        flex: 4,
        alignItems: 'center',
        padding: 20
    },
    image: {
        height: 200,
        width: 200,
        borderRadius: 100
    },  
    body: {
        flex: 4, 
        backgroundColor: 'white',
        alignItems: 'center',        
        padding: 20
    },
    logo: {
        flex: 1,
        height: '10%',
        width: '30%',
        alignSelf: "center"
    },
    bodyDescription: {
        textAlign: 'justify'
    },
    footer: {
        flex: 1,
        backgroundColor: '#eee',
        flexDirection: 'row'       
    },
    number: {
        backgroundColor: '#21618C',        
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
    },
    testView:{
        flex: 1,
        backgroundColor: '#eee',
        flexDirection: 'row'  
    },
    buttonTitle: {
        color: 'white',
        fontSize: 25  ,
        fontWeight: "bold"
    },
    logoutButton: {
        backgroundColor: 'grey',
        height: 48,
        width:'100%',
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    }
    ,
    buttonView:{
        alignItems: "center",
        backgroundColor:'white',

    }
});