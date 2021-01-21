import React from 'react'
import Store from '../utils/store.js';

export default class FilmServices {

    getFilm() {
        return new Promise((resolve, reject) => {

            fetch(Store.BASE_URL + 'film/list').then((response => {
                response.json().then(json => {
                    resolve(json)
                })
                    .catch(error => {
                        console.log(error.message)
                    } )
            }))
        })
    }

}
