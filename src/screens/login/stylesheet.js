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
        paddingHorizontal: 15,
        paddingVertical: 50,
    },
    input: {
        fontSize: 14,
    },
    rememberContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 5,
    },
    signupContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
    },
    helperText: {
        justifyContent: 'flex-start',
        height: 35,
    },
});

export default style;
