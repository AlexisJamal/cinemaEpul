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

}
