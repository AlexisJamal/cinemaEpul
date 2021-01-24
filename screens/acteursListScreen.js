import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';

import ActeurServices from '../services/acteurServices';
import styles from '../Style.js'

const ActeursListScreen = ({navigation}) => {

    const [acteurs, setActeurs] =  React.useState(null);

    const acteurServices = new ActeurServices()

    React.useEffect(() => {

        acteurServices.getActeurs().then(res => {
            setActeurs(res)
        })

    },[]);

    const loader = () => {
        if(acteurs == null) {
            return (<ActivityIndicator size="large" color="#0d1982" style={{marginTop: "50%"}} />)
        }
        else {
            return (
                <View>
                    <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center", marginBottom: 20}}>
                        <TouchableOpacity style={{marginLeft: 20, marginBottom: 30}} onPress={() => navigation.navigate('FilmScreen')}>
                            <Image
                                style={{width: 30, height: 30}}
                                resizeMode='contain'
                                source={require('../resources/homeIcon.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{fontSize: 18, fontWeight: "bold", marginLeft: "20%"}}>Liste des acteurs</Text>
                    </View>
                    {
                        acteurs.map((item, index) => {

                            return(
                                <View key={item.id}>
                                    <TouchableOpacity onPress={() => navigation.navigate('ActeurInfoScreen', {acteur : item})}>
                                        <View style={{marginLeft: 20, flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center"}}>
                                            <Text style={{fontSize: 15}}>{item.prenom} </Text>
                                            <Text style={{fontSize: 15}}>{item.nom} </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{borderBottomColor: '#D3D3D3', borderBottomWidth: 1, margin: 15, width: "50%", marginLeft: "25%"}}/>
                                </View>
                            )
                        })
                    }
                </View>)
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{overflowY: 'scroll'}}>
                <View style={styles.container}>
                    {loader()}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default ActeursListScreen;
