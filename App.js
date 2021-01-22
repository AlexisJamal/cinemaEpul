import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import 'react-native-gesture-handler';

import FilmScreen from './screens/filmScreen';
import InfoScreen from './screens/infoScreen';
import ActeursListScreen from './screens/acteursListScreen'
import ActeurInfoScreen from './screens/acteurInfoScreen'
import PersonnageInfoScreen from './screens/personnageInfoScreen'

export default createAppContainer(
    createSwitchNavigator(
        {
            FilmScreen: {
                screen: FilmScreen,
                navigationOptions: {
                  title: 'FilmScreen',
                  headerShown: false
                }
            },
            InfoScreen: {
                screen: InfoScreen,
                navigationOptions: {
                    title: 'InfoScreen',
                    headerShown: false
                }
            },
            ActeursListScreen: {
                screen: ActeursListScreen,
                navigationOptions: {
                    title: 'ActeursListScreen',
                    headerShown: false
                }
            },
            ActeurInfoScreen: {
                screen: ActeurInfoScreen,
                navigationOptions: {
                    title: 'ActeurInfoScreen',
                    headerShown: false
                }
            },
            PersonnageInfoScreen: {
                screen: PersonnageInfoScreen,
                navigationOptions: {
                    title: 'PersonnageInfoScreen',
                    headerShown: false
                }
            }
        },
        {
          initialRouteName: "FilmScreen"
        }
    )
)
