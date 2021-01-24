import React from 'react'
import Store from '../utils/store.js';

export default class PersonnageServices {

    getPersonnageById(id) {
        return new Promise((resolve, reject) => {

            fetch(Store.BASE_URL + 'personnage/' + id).then((response => {
                response.json().then(json => {
                    resolve(json)
                })
                    .catch(error => {
                        console.log(error.message)
                    } )
            }))
        })
    }

    deletePersonnageById(id) {
        return new Promise((resolve, reject) => {

            fetch(Store.BASE_URL + 'personnage/' + id, {
                method: 'DELETE'
            }).then((response => {
                resolve(response)
            }))
        })
    }

    updatePersonnage(personnageId, nom, acteurId, filmId) {
        return new Promise((resolve, reject) => {
            fetch(Store.BASE_URL + 'personnage/update', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": personnageId,
                    "nom": nom,
                    "acteurId": acteurId,
                    "filmId": filmId
                })
            }).then((response => {
                resolve(response)
            }))
        })
    }

    addPersonnage(nom, acteurId, filmId) {
        return new Promise((resolve, reject) => {
            fetch(Store.BASE_URL + 'personnage/add', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "nom": nom,
                    "acteurId": acteurId,
                    "filmId": filmId
                })
            }).then((response => {
                resolve(response)
            }))
        })
    }

}
