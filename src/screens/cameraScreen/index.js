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
        allCompany = false,
        companies,
        allProducts,
        productList,
        from
    } = route.params;
    const [name, setName] = useState('Product Name');
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
            if (allCompany) {
                const filterProducts = allProducts.filter(product => product.barkod === codes[0].value);
                navigation.replace("SearchScreen", {
                    filterProducts,
                    allProducts,
                    companies,
                });
            } else {
                const readQr = productList.find(
                    product => product.barkod == codes[0].value,
                );
                if (readQr != null) {
                    setName(readQr.name);
                    setPrice(readQr.price);
                } else {
                    setName('Undefined Product');
                    setPrice(0);
                }
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
                allCompany ?
                    navigation.replace("SearchScreen", {
                        similarIds: ids,
                        allProducts,
                        companies
                    })
                    :
                    navigation.navigate("ProductsScreen", {
                        similarIds: ids
                    });
            })
            .catch(err => {
                console.log(err);
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
                            codeScanner={from === "barcod" ? codeScanner : false}
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
                                            Please scan the product
                                        </Text>
                                        <Text style={classes.title}>barcode</Text>
                                    </View>
                                    :
                                    <View>
                                        <Text style={classes.title}>
                                            Please take a picture
                                        </Text>
                                        <Text style={classes.title}>of the product</Text>
                                    </View>
                            }
                        </View>
                    </View>
                    <View style={classes.bottomContainer}>
                        {
                            from === "barcod" ?
                                (!allCompany ?
                                    <View View style={classes.titleContainer}>
                                        <Text style={classes.product}>{name}</Text>
                                        <View style={classes.priceContainer}>
                                            <Text style={classes.price}>{price}</Text>
                                            <Text style={classes.currency}>TL</Text>
                                        </View>
                                    </View>
                                    :
                                    null
                                )
                                :
                                <TouchableOpacity
                                    style={classes.takePhoto}
                                    activeOpacity={0.5}
                                    onPress={async () => {
                                        const file = await camera.current.takePhoto();
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
        </View >
    );
};
export default CameraScreen;
