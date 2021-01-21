import React from 'react'
import { format } from 'date-fns'

export default class Store {
    static BASE_URL = "http://192.168.1.100:8081/"

    static dateFormat = (date) => {
        return format(date, 'dd/MM/yyyy')
    }

    static numFormatter = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
}
