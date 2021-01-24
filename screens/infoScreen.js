import React from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    Modal,
    TouchableWithoutFeedback, Dimensions, TextInput,
} from 'react-native';

import Store from '../utils/store.js';
import styles from '../Style.js'
import PersonnageServices from '../services/personnageServices';
import ActeurServices from '../services/acteurServices';
import FilmServices from '../services/filmServices';
import DropDownPicker from "react-native-dropdown-picker";

const InfoScreen = ({route, navigation}) => {

    const [film, setFilm] =  React.useState(navigation.getParam('film'));
    const [modalVisible, setModalVisible] =  React.useState(false);
    const [newName, setNewName] =  React.useState("");
    const [selectedActeurId, setSelectedActeurId] =  React.useState("");
    const [acteursList, setActeursList] =  React.useState([]);

    const personnageServices = new PersonnageServices()
    const acteurServices = new ActeurServices()
    const filmServices = new FilmServices()

    const openModal = () => {
        acteurServices.getActeurs().then(acteurs => {
            let list = []
            for(let a of acteurs) {
                list.push({value: a.id, label: a.prenom + ' ' + a.nom})
            }
            setActeursList(list)
            setSelectedActeurId(list[0].value)
            setModalVisible(true)
        })
    }

    const handleAddPersonnage = () => {
        personnageServices.addPersonnage(newName, selectedActeurId, film.id).then(() => {
            setModalVisible(false)
            filmServices.getFilmById(film.id).then(res => {
                setFilm(res)
            })
        })
    }

    const displayModal = () => {
        if(acteursList.length > 0) {
            return (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={{flex: 1, backgroundColor: "#000000AA", justifyContent: "flex-end"}}>
                        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                            <View style={{flex: 1, width: "100%"}}/>
                        </TouchableWithoutFeedback>
                        <View style={[styles.modalView, {maxHeight: Dimensions.get("window").height * 0.45}]}>
                            <Text style={{fontSize: 15, fontWeight: "bold", textAlign: "center"}}>Ajouter un personnage au film</Text>
                            <View style={{marginTop: 32}}>
                                <Text style={styles.inputTitle}>Nom</Text>
                                <TextInput style={styles.input}
                                           autoCapitalize="none"
                                           onChangeText={newName => setNewName(newName)}
                                           value={newName}
                                ></TextInput>
                            </View>

                            <View style={{marginTop: 32, zIndex: 1000}}>
                                <Text style={[styles.inputTitle, {marginBottom: 5}]}>Acteur</Text>
                                <DropDownPicker
                                    items={acteursList}
                                    defaultValue={selectedActeurId}
                                    containerStyle={{height: 40}}
                                    style={{backgroundColor: "#fafafa"}}
                                    labelStyle={{color: "black"}}
                                    itemStyle={{justifyContent: "flex-start"}}
                                    dropDownStyle={{backgroundColor: "#fafafa"}}
                                    onChangeItem={item => setSelectedActeurId(item.value)}/>
                            </View>

                            <TouchableOpacity
                                style={[styles.button, {backgroundColor: 'blue', marginBottom: 10, marginTop: 50}]}
                                onPress={handleAddPersonnage}>
                                <Text style={{color: "#FFF", fontWeight: "500"}}>Ajouter</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )
        }
    }

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
                    <Image style={{width: 100, height: 100, marginLeft: 20}}
                           source={{uri: film.categorie.image}}
                           resizeMode='contain'/>

                    <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center"}}>
                        <TouchableOpacity style={{marginHorizontal: 20, marginBottom: 30}} onPress={openModal}>
                            <Image
                                style={{width: 30, height: 30}}
                                resizeMode='contain'
                                source={require('../resources/add.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{marginTop: 30, marginBottom: 30, fontSize: 15, fontWeight: "bold"}}>Liste des personnages du film</Text>
                    </View>

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

                    {displayModal()}
                </View>
            </ScrollView>
        </SafeAreaView>
    )

};

export default InfoScreen;
