const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25
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
        backgroundColor: 'powderblue',
        alignItems: 'center',        
        padding: 20
    },
    bodyTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 40
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
    email: {
        backgroundColor: 'steelblue',
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
    },
    text: {
        color: 'white'
    }
});

export default Profile