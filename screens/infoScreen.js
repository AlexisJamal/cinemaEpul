import React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Text, TouchableOpacity, Image } from 'react-native';

import Store from '../utils/store.js';

const InfoScreen = ({route, navigation}) => {

    const film = navigation.getParam('film');

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{overflowY: 'scroll'}}>
                <View style={styles.container}>
                    <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center"}}>
                        <TouchableOpacity style={{marginLeft: 20, marginBottom: 30}} onPress={() => navigation.navigate('FilmScreen')}>
                            <Image
                                style={{width: 30, height: 30}}
                                resizeMode='contain'
                                source={require('../resources/homeIcon.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{fontSize: 15, fontWeight: "bold", marginLeft: "20%"}}>{film.titre}</Text>
                    </View>
                    <Text style={{marginTop: 10, marginLeft: 20}}>Durée: {film.duree} minutes</Text>
                    <Text style={{marginTop: 10, marginLeft: 20}}>Date de sortie: {Store.dateFormat(new Date(film.dateSortie))}</Text>
                    <Text style={{marginTop: 10, marginLeft: 20}}>Budget: {Store.numFormatter(film.budget)} €</Text>
                    <Text style={{marginTop: 10, marginLeft: 20}}>Recettes: {Store.numFormatter(film.montantRecette)} €</Text>
                    <Text style={{marginTop: 10, marginLeft: 20}}>Réalisateur: {film.realisateur.prenom} {film.realisateur.nom}</Text>
                    <Text style={{marginTop: 10, marginLeft: 20}}>Catégorie: {film.categorie.libelle}</Text>

                    <Text style={{marginTop: 30, marginBottom: 30, fontSize: 15, fontWeight: "bold", textAlign: "center"}}>Liste des personnages du film</Text>

                    {
                        film.personnages.map((item, index) => {

                            return(
                                <View key={item.id}>
                                    <TouchableOpacity onPress={() => navigation.navigate('PersonnageInfoScreen', {personnageId : item.id, previousScreen: 'InfoScreen'})}>
                                        <View style={{marginLeft: 20, flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center"}}>
                                            <Text style={{fontSize: 15}}>{item.nom} par {item.acteur.prenom} {item.acteur.nom}</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    }
});

export default InfoScreen;
