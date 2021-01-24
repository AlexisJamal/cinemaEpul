import React from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    Image, Modal, TouchableWithoutFeedback, Dimensions, TextInput,
} from 'react-native';

import Store from '../utils/store.js';
import styles from '../Style.js'
import PersonnageServices from '../services/personnageServices';
import ActeurServices from '../services/acteurServices';
import FilmServices from '../services/filmServices';
import DropDownPicker from "react-native-dropdown-picker";

const ActeurInfoScreen = ({route, navigation}) => {

    const [acteur, setActeur] =  React.useState(navigation.getParam('acteur'));
    const [modalVisible, setModalVisible] =  React.useState(false);
    const [newName, setNewName] =  React.useState("");
    const [selectedFilmId, setSelectedFilmId] =  React.useState("");
    const [filmsList, setFilmsList] =  React.useState([]);

    const personnageServices = new PersonnageServices()
    const acteurServices = new ActeurServices()
    const filmServices = new FilmServices()

    const openModal = () => {
        filmServices.getFilms().then(films => {
            let list = []
            for(let f of films) {
                list.push({value: f.id, label: f.titre})
            }
            setFilmsList(list)
            setSelectedFilmId(list[0].value)
            setModalVisible(true)
        })
    }

    const handleAddPersonnage = () => {
        personnageServices.addPersonnage(newName, acteur.id, selectedFilmId).then(() => {
            setModalVisible(false)
            acteurServices.getActeurById(acteur.id).then(res => {
                setActeur(res)
            })
        })
    }

    const displayModal = () => {
        if(filmsList.length > 0) {
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
                            <Text style={{fontSize: 15, fontWeight: "bold", textAlign: "center"}}>Ajouter un personnage à l'acteur</Text>
                            <View style={{marginTop: 32}}>
                                <Text style={styles.inputTitle}>Nom</Text>
                                <TextInput style={styles.input}
                                           autoCapitalize="none"
                                           onChangeText={newName => setNewName(newName)}
                                           value={newName}
                                ></TextInput>
                            </View>

                            <View style={{marginTop: 32, zIndex: 1000}}>
                                <Text style={[styles.inputTitle, {marginBottom: 5}]}>Film</Text>
                                <DropDownPicker
                                    items={filmsList}
                                    defaultValue={selectedFilmId}
                                    containerStyle={{height: 40}}
                                    style={{backgroundColor: "#fafafa"}}
                                    labelStyle={{color: "black"}}
                                    itemStyle={{justifyContent: "flex-start"}}
                                    dropDownStyle={{backgroundColor: "#fafafa"}}
                                    onChangeItem={item => setSelectedFilmId(item.value)}/>
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

                    <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center"}}>
                        <TouchableOpacity style={{marginHorizontal: 20, marginBottom: 30}} onPress={openModal}>
                            <Image
                                style={{width: 30, height: 30}}
                                resizeMode='contain'
                                source={require('../resources/add.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{marginTop: 30, marginBottom: 30, fontSize: 15, fontWeight: "bold"}}>Liste des personnages de l'acteur</Text>
                    </View>

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

                    {displayModal()}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default ActeurInfoScreen;
