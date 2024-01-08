import {SafeAreaView, Text, StyleSheet, View, Linking} from 'react-native';
import style from './stylesheet';
import {useColors} from '../../utils/settings';
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
} from 'react-native-vision-camera';
import {useEffect} from 'react';

const BarcodScanner = ({navigation, route}) => {
    const colors = useColors();
    const classes = style({colors});
    const {hasPermission, requestPermission} = useCameraPermission();
    console.log(hasPermission);

    useEffect(() => {
        //requestCameraPermissions();
        if (!hasPermission) {
            requestPermission();
        }
    }, []);

    /*const requestCameraPermissions = useCallback(async () => {
        const permission = await Camera.requestCameraPermission();
        if (permission == 'denied') await Linking.openSettings();
    }, []);*/

    const device = useCameraDevice('back');
    if (device == null) {
        return (
            <SafeAreaView>
                <Text>kamera yok</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'green',
                justifyContent: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 150}}>SCANNSHOP</Text>
            <Camera style={{flex: 1}} device={device} isActive={true} />
        </SafeAreaView>
    );
};
export default BarcodScanner;
