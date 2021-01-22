import React from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    Image, ActivityIndicator,
} from 'react-native';

import PersonnageServices from '../services/personnageServices';
import ActeurServices from '../services/acteurServices';
import FilmServices from '../services/filmServices';

const PersonnageInfoScreen = ({route, navigation}) => {

    const personnageId = navigation.getParam('personnageId');
    const previousScreen = navigation.getParam('previousScreen');
    const film = navigation.getParam('film');
    const acteur = navigation.getParam('acteur');


    const [personnage, setPersonnage] =  React.useState(null);

    const personnageServices = new PersonnageServices()
    const acteurServices = new ActeurServices()
    const filmServices = new FilmServices()

    React.useEffect(() => {

        personnageServices.getPersonnageById(personnageId).then(res => {
            setPersonnage(res)
        })

    },[]);

    const goToActeur = () => {
        acteurServices.getActeurById(personnage.acteur.id).then(res => {
            navigation.navigate('ActeurInfoScreen', {acteur : res})
        })
    }

    const goToFilm = () => {
        filmServices.getFilmById(personnage.film.id).then(res => {
            navigation.navigate('InfoScreen', {film : res})
        })
    }

    const loader = () => {
        if(personnage == null) {
            return (<ActivityIndicator size="large" color="#0d1982" style={{marginTop: "50%"}} />)
        }
        else {
            return (
                <View>
                    <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center"}}>
                        <TouchableOpacity style={{marginLeft: 20, marginBottom: 30}} onPress={() => navigation.navigate(previousScreen, {acteur: acteur, film: film})}>
                            <Image
                                style={{width: 30, height: 30}}
                                resizeMode='contain'
                                source={require('../resources/backIcon.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{fontSize: 15, fontWeight: "bold", marginLeft: "20%"}}>{personnage.nom}</Text>
                    </View>
                    <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center", marginBottom: 5}}>
                        <Text style={{marginTop: 10, marginLeft: 20, width: "40%"}}>Acteur: {personnage.acteur.prenom} {personnage.acteur.nom}</Text>
                        <TouchableOpacity style={styles.button} onPress={goToActeur}>
                            <Text style={{ color: "#FFF", fontWeight: "500"}}>Afficher</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center"}}>
                        <Text style={{marginTop: 10, marginLeft: 20, width: "40%"}}>Film: {personnage.film.titre}</Text>
                        <TouchableOpacity style={styles.button} onPress={goToFilm}>
                            <Text style={{ color: "#FFF", fontWeight: "500"}}>Afficher</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#ADD8E6",
        borderRadius: 4,
        height: 30,
        width: 70,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default PersonnageInfoScreen;
