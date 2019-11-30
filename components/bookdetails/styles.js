import {StyleSheet} from 'react-native';

export default Styles = StyleSheet.create({
    titleText:{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10,             
    },
    subTitleText:{
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 3,
        marginLeft: 10,
        marginTop: 5
    },
    infoText:{
        fontStyle: 'italic',
        padding: 5
    },
    viewHolderCenter: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',

    },
    bookThumbNail:{
        width: 150,
        height: 250,
        borderRadius: 10,
    },
    bookThumbNailHolder:{
        elevation: 4,
        marginTop: 30,
        width: 150,
        height: 250,
        borderRadius: 10,
    },
    activityStyle:{
        flex: 1,
        flexDirection: 'column'
    },
    bookDescription: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    expandableTextView:{
        flex: 1,
        flexDirection: 'row',
        textAlign: 'right',
        justifyContent: 'flex-end',
        marginRight: 10,
    },
    expandableText:{
        color: '#303f9f',
    },
    downloadButton:{
        width: 150, 
        height: 40,
    },
    downloadSection:{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});