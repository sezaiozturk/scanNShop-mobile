import {
    TouchableOpacity,
    SafeAreaView,
    Text,
    View,
    Image,
} from 'react-native';
import style from './stylesheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    useColors
} from '../../utils/settings';
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
    useCodeScanner,
} from 'react-native-vision-camera';
import {
    useEffect,
    useState,
    useRef
} from 'react';
import axios from 'axios';
import {
    HOST
} from '../../constants';

const CameraScreen = ({
    navigation,
    route
}) => {
    const colors = useColors();
    const classes = style({
        colors
    });
    const {
        hasPermission,
        requestPermission
    } = useCameraPermission();

    const {
        productList,
        from
    } = route.params;
    const [name, setName] = useState('Ürün Adı');
    const [price, setPrice] = useState(0);
    const [photoFile, setPhotoFile] = useState(null);
    const camera = useRef(null);

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, []);

    useEffect(() => {
        if (photoFile != null) {
            photoUpload();
        }
    }, [photoFile]);

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
    };

    const convertToObject = (str) => {
        const regex = /'([^']+)'/g;
        const matches = str.match(regex);
        return matches.map(match => match.slice(1, -1));
    };

    const photoUpload = () => {
        const formData = new FormData();
        formData.append('file', {
            uri: photoFile.path,
            type: 'jpeg',
            name: photoFile.path.split("/")[7]
        });

        axios.post(`http://${HOST}:3000/user/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(res => {
                const ids = convertToObject(res.data);
                navigation.navigate("ProductsScreen", {
                    similarIds: ids
                });
            })
            .catch(error => {
                console.log("yüklenmedi");
            });
    };

    return (
        <View style={classes.container}>
            <View style={{
                flex: 1,
            }}>
                {
                    photoFile === null ?
                        <Camera
                            ref={camera}
                            style={classes.camera}
                            device={device}
                            codeScanner={codeScanner}
                            isActive={true}
                            photo={true}
                        />
                        :
                        <Image
                            source={{
                                uri: `file://${photoFile.path}`
                            }}
                            style={{
                                flex: 1
                            }}
                        />
                }
                <View style={classes.panelContainer}>
                    <View style={classes.topContainer}>
                        <View style={classes.titleContainer}>
                            {
                                from === "barcod" ?
                                    <View>
                                        <Text style={classes.title}>
                                            Lütfen ürün barkodunu
                                        </Text>
                                        <Text style={classes.title}>taratın</Text>
                                    </View>
                                    :
                                    <View>
                                        <Text style={classes.title}>
                                            Lütfen ürünün resmini
                                        </Text>
                                        <Text style={classes.title}>çekin</Text>
                                    </View>
                            }
                        </View>
                    </View>
                    <View style={classes.bottomContainer}>
                        {
                            from === "barcod" ?
                                <View style={classes.titleContainer}>
                                    <Text style={classes.product}>{name}</Text>
                                    <View style={classes.priceContainer}>
                                        <Text style={classes.price}>{price}</Text>
                                        <Text style={classes.currency}>TL</Text>
                                    </View>
                                </View>
                                :
                                <TouchableOpacity
                                    style={classes.takePhoto}
                                    activeOpacity={0.5}
                                    onPress={async () => {
                                        const file = await camera.current.takePhoto();
                                        const result = await fetch(`file://${file.path}`);
                                        const data = await result.blob();
                                        setPhotoFile(file);
                                    }}>
                                    <Icon name="camera" size={35} color={colors.white} />
                                </TouchableOpacity>
                        }
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
export default CameraScreen;
