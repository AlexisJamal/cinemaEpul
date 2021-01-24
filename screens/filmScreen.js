import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image, Modal, TouchableWithoutFeedback, Dimensions, TextInput,
} from 'react-native';

import FilmServices from '../services/filmServices';
import DropDownPicker from "react-native-dropdown-picker";
import RealisateurServices from '../services/realisateurServices';
import CategorieServices from '../services/categorieServices';
import styles from '../Style.js'

const FilmScreen = ({navigation}) => {

    const [films, setFilms] =  React.useState(null);
    const [modalVisible, setModalVisible] =  React.useState(false);
    const [selectedRealisateurId, setSelectedRealisateurId] =  React.useState("");
    const [selectedCategorieId, setSelectedCategorieId] =  React.useState("");
    const [realisateursList, setRealisateursList] =  React.useState([]);
    const [categoriesList, setCategoriesList] =  React.useState([]);

    const filmServices = new FilmServices()
    const realisateurServices = new RealisateurServices()
    const categorieServices = new CategorieServices()

    React.useEffect(() => {

        filmServices.getFilms().then(res => {
            setFilms(res)
        })

    },[]);

    const openModal = () => {
        realisateurServices.getRealisateurs().then(realisateurs => {
            let list = []
            list.push({value: -1, label: "Tous les réalisateurs"})
            for(let r of realisateurs) {
                list.push({value: r.id, label: r.prenom + ' ' + r.nom})
            }
            setRealisateursList(list)
            if(selectedRealisateurId == "") {
                setSelectedRealisateurId(list[0].value)
            }

            categorieServices.getCategories().then(categories => {
                let list = []
                list.push({value: -1, label: "Toutes les catégories"})
                for(let c of categories) {
                    list.push({value: c.id, label: c.libelle})
                }
                setCategoriesList(list)
                if(selectedCategorieId == "") {
                    setSelectedCategorieId(list[0].value)
                }
                setModalVisible(true)
            })
        })
    }

    const filtrer = () => {
        setFilms(null)
        setModalVisible(false)
        if(selectedRealisateurId != -1 || selectedCategorieId != -1) {
            filmServices.getFilmsBySearch(selectedRealisateurId, selectedCategorieId).then(res => {
                setFilms(res)
            })
        }
        else {
            filmServices.getFilms().then(res => {
                setFilms(res)
            })
        }

    }

    const loader = () => {
        if(films == null) {
            return (<ActivityIndicator size="large" color="#0d1982" style={{marginTop: "50%"}} />)
        }
        else {
            return (
                <View>
                    <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-end", marginBottom: 20}}>
                        <TouchableOpacity style={[styles.displayButton, {marginRight: 20}]} onPress={openModal}>
                            <Text style={{ color: "#FFF", fontWeight: "500"}}>Filtrer</Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 18, fontWeight: "bold", marginRight: "20%"}}>Liste des films</Text>
                        <TouchableOpacity style={{marginRight: 20, marginBottom: 30}} onPress={() => navigation.navigate('ActeursListScreen')}>
                            <Image
                                style={{width: 30, height: 30}}
                                resizeMode='contain'
                                source={require('../resources/users.png')}
                            />
                        </TouchableOpacity>
                    </View>
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

    const displayModal = () => {
        if(realisateursList.length > 0 && categoriesList.length > 0) {
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
                        <View style={[styles.modalView, {maxHeight: Dimensions.get("window").height * 0.5}]}>
                            <Text style={{fontSize: 15, fontWeight: "bold", textAlign: "center"}}>Filtrer les
                                films</Text>

                            <View style={{marginTop: 32, zIndex: 1000}}>
                                <Text style={[styles.inputTitle, {marginBottom: 5}]}>Réalisateur</Text>
                                <DropDownPicker
                                    items={realisateursList}
                                    defaultValue={selectedRealisateurId}
                                    containerStyle={{height: 40}}
                                    style={{backgroundColor: "#fafafa"}}
                                    labelStyle={{color: "black"}}
                                    itemStyle={{justifyContent: "flex-start"}}
                                    dropDownStyle={{backgroundColor: "#fafafa"}}
                                    onChangeItem={item => setSelectedRealisateurId(item.value)}/>
                            </View>

                            <View style={{marginTop: 32, zIndex: 500}}>
                                <Text style={[styles.inputTitle, {marginBottom: 5}]}>Catégorie</Text>
                                <DropDownPicker
                                    items={categoriesList}
                                    defaultValue={selectedCategorieId}
                                    containerStyle={{height: 40}}
                                    style={{backgroundColor: "#fafafa"}}
                                    labelStyle={{color: "black"}}
                                    itemStyle={{justifyContent: "flex-start"}}
                                    dropDownStyle={{backgroundColor: "#fafafa"}}
                                    onChangeItem={item => setSelectedCategorieId(item.value)}/>
                            </View>

                            <TouchableOpacity
                                style={[styles.button, {backgroundColor: 'blue', marginBottom: 10, marginTop: 50}]}
                                onPress={filtrer}>
                                <Text style={{color: "#FFF", fontWeight: "500"}}>Filtrer</Text>
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

export default FilmScreen;
