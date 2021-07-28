import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        alignItems: 'center',        
    },
    searchbox:{
        position: 'absolute',
        top: '40%',
        margin: 20,
        backgroundColor:'#fff'
    },
    underText:{
        color: '#000',
        position: 'absolute',
        top: '50%',
        marginTop: 8,
        fontSize: 16
    },
    activityIndicatorStyle:{
        marginTop: 10,
        position: 'absolute',
        top: '55%',
    },
    preferenceButton: {
        position: 'absolute',
        bottom: '10%'
    }
  });
