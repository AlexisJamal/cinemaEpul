import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import 'react-native-gesture-handler';

import FilmScreen from './screens/filmScreen';
import InfoScreen from './screens/infoScreen';

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
            }
        },
        {
          initialRouteName: "FilmScreen"
        }
    )
)
