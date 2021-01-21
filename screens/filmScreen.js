import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

import FilmServices from '../services/filmServices';

const FilmScreen = ({navigation}) => {

    const [films, setFilms] =  React.useState(null);

    const filmServices = new FilmServices()

    React.useEffect(() => {

        filmServices.getFilm().then(res => {
            setFilms(res)
        })

    },[]);

    const loader = () => {
        if(films == null) {
            return (<ActivityIndicator size="large" color="#0d1982" style={{marginTop: "50%"}} />)
        }
        else {
            return (
                <View>
                    <Text style={{marginBottom: 20, fontSize: 18, fontWeight: "bold", marginRight: 5, textAlign: "center"}}>Liste des films</Text>
                    {
                        films.map((item, index) => {

                            return(
                                <View key={item.id}>
                                    <TouchableOpacity onPress={() => navigation.navigate('InfoScreen', {film : item})}>
                                        <View style={{marginLeft: 20, flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center"}}>
                                            <Text style={{fontSize: 15, fontWeight: "bold", width: "50%"}}>{item.titre} </Text>
                                            <View style={{width: "30%"}}>
                                                <Text style={{fontSize: 15}}>{item.realisateur.prenom} </Text>
                                                <Text style={{fontSize: 15}}>{item.realisateur.nom} </Text>
                                            </View>
                                            <Text style={{fontSize: 15, width: "20%"}}>{item.categorie.libelle} </Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    }
});

export default FilmScreen;
