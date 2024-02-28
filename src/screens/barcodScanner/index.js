import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import style from './stylesheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useColors} from '../../utils/settings';
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
    useCodeScanner,
} from 'react-native-vision-camera';
import {useEffect, useState} from 'react';

const BarcodScanner = ({navigation, route}) => {
    const colors = useColors();
    const classes = style({colors});
    const {hasPermission, requestPermission} = useCameraPermission();
    console.log(hasPermission);
    const {productList} = route.params;
    const [name, setName] = useState('Ürün Adı');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, []);

    const codeScanner = useCodeScanner({
        codeTypes: ['qr', 'ean-13'],
        onCodeScanned: codes => {
            console.log(codes[0].value);
            const readQr = productList.find(
                product => product.barkod == codes[0].value,
            );
            if (readQr != null) {
                setName(readQr.name);
                setPrice(readQr.price);
            } else {
                setName('tanımsız ürün');
                setPrice(0);
            }
        },
    });

    const device = useCameraDevice('back');
    if (device == null) {
        return (
            <SafeAreaView>
                <Text>kamera yok</Text>
            </SafeAreaView>
        );
    }

    return (
        <View style={classes.container}>
            <View style={{flex: 1}}>
                <Camera
                    style={classes.camera}
                    device={device}
                    codeScanner={codeScanner}
                    isActive={true}
                />
                <View style={classes.panelContainer}>
                    <View style={classes.topContainer}>
                        <View style={classes.titleContainer}>
                            <Text style={classes.title}>
                                Lütfen ürün barkodunu
                            </Text>
                            <Text style={classes.title}>taratın</Text>
                        </View>
                    </View>
                    <View style={classes.bottomContainer}>
                        <View style={classes.titleContainer}>
                            <Text style={classes.product}>{name}</Text>
                            <View style={classes.priceContainer}>
                                <Text style={classes.price}>{price}</Text>
                                <Text style={classes.currency}>TL</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={classes.close}
                            activeOpacity={0.5}
                            onPress={() => navigation.goBack()}>
                            <Icon name="close" size={20} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};
export default BarcodScanner;
