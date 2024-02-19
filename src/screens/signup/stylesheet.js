import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    },
    logo: {
        resizeMode: 'contain',
        alignSelf: 'center',
        height: 150,
        width: 150,
    },
    inputContainer: {
        paddingHorizontal: 20,
        paddingVertical: 50,
    },
    input: {
        marginVertical: 5,
        fontSize: 14,
    },
    signupContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
    },
});

export default style;
