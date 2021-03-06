import React from 'react';
import {
    View,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    Image, ActivityIndicator, Alert, Modal, TouchableWithoutFeedback, Dimensions, TextInput
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import PersonnageServices from '../services/personnageServices';
import ActeurServices from '../services/acteurServices';
import FilmServices from '../services/filmServices';
import styles from '../Style.js'

const PersonnageInfoScreen = ({route, navigation}) => {

    const personnageId = navigation.getParam('personnageId');
    const previousScreen = navigation.getParam('previousScreen');


    const [personnage, setPersonnage] =  React.useState(null);
    const [modalVisible, setModalVisible] =  React.useState(false);
    const [newName, setNewName] =  React.useState("");
    const [selectedActeurId, setSelectedActeurId] =  React.useState("");
    const [selectedFilmId, setSelectedFilmId] =  React.useState("");
    const [filmsList, setFilmsList] =  React.useState([]);
    const [acteursList, setActeursList] =  React.useState([]);

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

    const goBack = () => {
        if(previousScreen == 'ActeurInfoScreen') {
            goToActeur()
        }
        else if(previousScreen == 'InfoScreen') {
            goToFilm()
        }
    }

    const openModal = () => {
        setNewName(personnage.nom)
        setSelectedActeurId(personnage.acteur.id)
        setSelectedFilmId(personnage.film.id)
        filmServices.getFilms().then(films => {
            let list = []
            for(let f of films) {
                list.push({value: f.id, label: f.titre})
            }
            setFilmsList(list)

            acteurServices.getActeurs().then(acteurs => {
                let list = []
                for(let a of acteurs) {
                    list.push({value: a.id, label: a.prenom + ' ' + a.nom})
                }
                setActeursList(list)
                setModalVisible(true)
            })
        })
    }

    const handleDelete = () => {
        Alert.alert(
            "Supprimer le personnage",
            "Confirmer la suppression du personnage",
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                { text: "Confirmer", onPress: () => {
                        personnageServices.deletePersonnageById(personnageId).then(() => {
                            navigation.navigate('FilmScreen')
                        })
                    } }
            ],
            { cancelable: false }
        )
    }

    const handleUpdate = () => {
        setPersonnage(null)
        setModalVisible(false)
        personnageServices.updatePersonnage(personnageId, newName, selectedActeurId, selectedFilmId).then(() => {
            personnageServices.getPersonnageById(personnageId).then(res => {
                setPersonnage(res)
            })
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
                        <TouchableOpacity style={{marginLeft: 20, marginBottom: 30}} onPress={goBack}>
                            <Image
                                style={{width: 30, height: 30}}
                                resizeMode='contain'
                                source={require('../resources/backIcon.png')}
                            />
                        </TouchableOpacity>
                        <Text style={{fontSize: 15, fontWeight: "bold", marginLeft: "20%"}}>{personnage.nom}</Text>
                    </View>
                    <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center", marginBottom: 5}}>
                        <Text style={{marginTop: 10, marginLeft: 20, width: "50%"}}>Acteur: {personnage.acteur.prenom} {personnage.acteur.nom}</Text>
                        <TouchableOpacity style={styles.displayButton} onPress={goToActeur}>
                            <Text style={{ color: "#FFF", fontWeight: "500"}}>Afficher</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center", marginBottom: 50}}>
                        <Text style={{marginTop: 10, marginLeft: 20, width: "50%"}}>Film: {personnage.film.titre}</Text>
                        <TouchableOpacity style={styles.displayButton} onPress={goToFilm}>
                            <Text style={{ color: "#FFF", fontWeight: "500"}}>Afficher</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={[styles.button, {backgroundColor: 'blue', marginBottom: 10}]} onPress={openModal}>
                        <Text style={{ color: "#FFF", fontWeight: "500"}}>Modifier le personnage</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]} onPress={handleDelete}>
                        <Text style={{ color: "#FFF", fontWeight: "500"}}>Supprimer le personnage</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    const displayModal = () => {
        if(personnage != null) {
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
                        <View style={[styles.modalView, {maxHeight: Dimensions.get("window").height * 0.6}]}>
                            <Text style={{fontSize: 15, fontWeight: "bold", textAlign: "center"}}>Modifier le personnage</Text>
                            <View style={{ marginTop: 32 }}>
                                <Text style={styles.inputTitle}>Nom</Text>
                                <TextInput style={styles.input}
                                           autoCapitalize="none"
                                           onChangeText={newName => setNewName(newName)}
                                           value={newName}
                                ></TextInput>
                            </View>

                            <View style={{ marginTop: 32, zIndex: 1000 }}>
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

                            <View style={{ marginTop: 32, zIndex: 500  }}>
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

                            <TouchableOpacity style={[styles.button, {backgroundColor: 'blue', marginBottom: 10, marginTop: 50}]} onPress={handleUpdate}>
                                <Text style={{ color: "#FFF", fontWeight: "500"}}>Valider</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>)
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView style={{overflowY: 'scroll'}}>
                <View style={styles.container}>
                    {loader()}

                    {displayModal()}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default PersonnageInfoScreen;
