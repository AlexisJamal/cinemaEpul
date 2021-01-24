import React from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import Store from '../utils/store.js';
import styles from '../Style.js'

const ActeurInfoScreen = ({route, navigation}) => {

    const acteur = navigation.getParam('acteur');

    const displayDeathDate = () => {
        if (acteur.dateDeces != null) {
            return (<Text style={{marginTop: 10, marginLeft: 20}}>Date de décès: {Store.dateFormat(new Date(acteur.dateDeces))}</Text>)
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{overflowY: 'scroll'}}>
                <View style={styles.container}>
                    <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center"}}>
                        <TouchableOpacity style={{marginLeft: 20, marginBottom: 30}} onPress={() => navigation.navigate('ActeursListScreen')}>
                            <Image
                                style={{width: 30, height: 30}}
                                resizeMode='contain'
                                source={require('../resources/backIcon.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{fontSize: 15, fontWeight: "bold", marginLeft: "20%"}}>{acteur.prenom} {acteur.nom}</Text>
                    </View>
                    <Text style={{marginTop: 10, marginLeft: 20}}>Date de naissance: {Store.dateFormat(new Date(acteur.dateNaissance))}</Text>
                    {displayDeathDate()}

                    <Text style={{marginTop: 30, marginBottom: 30, fontSize: 15, fontWeight: "bold", textAlign: "center"}}>Liste des personnages de l'acteur</Text>

                    {
                        acteur.personnages.map((item, index) => {

                            return(
                                <View key={item.id}>
                                    <TouchableOpacity onPress={() => navigation.navigate('PersonnageInfoScreen', {personnageId : item.id, previousScreen: 'ActeurInfoScreen'})}>
                                        <View style={{marginLeft: 20, flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center"}}>
                                            <Text style={{fontSize: 15}}>{item.nom} dans {item.film.titre}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{borderBottomColor: '#D3D3D3', borderBottomWidth: 1, margin: 15, width: "50%", marginLeft: "25%"}}/>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default ActeurInfoScreen;
