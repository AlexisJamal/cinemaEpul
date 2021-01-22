import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import 'react-native-gesture-handler';

import FilmScreen from './screens/filmScreen';
import InfoScreen from './screens/infoScreen';
import ActeursListScreen from './screens/acteursListScreen'

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
            }
        },
        {
          initialRouteName: "FilmScreen"
        }
    )
)
