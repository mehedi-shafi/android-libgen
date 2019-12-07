import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    body:{
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
      borderRadius: 5,  
    },
    bookRowCard:{
        height: 200,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        padding: 15,
        elevation: 5,
        justifyContent: 'center',
        borderRadius: 5,        
    },
    bookRowCardBig:{
        height: 300,
        margin: 10,
        padding: 15,
        elevation: 5,
        justifyContent: 'center'
    },
    titleText:{
        textAlign: 'justify',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,                
    },
    subTitleText:{
        fontWeight: 'bold',
        marginBottom: 3,
    },
    infoText:{
        fontStyle: 'italic',
        padding: 5
    }
});