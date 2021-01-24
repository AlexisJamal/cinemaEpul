import {StyleSheet} from 'react-native';

export default {
    container: {
        flex: 1,
        padding: 20
    },
    displayButton: {
        backgroundColor: "#ADD8E6",
        borderRadius: 4,
        height: 30,
        width: 70,
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        marginHorizontal: 30,
        borderRadius: 4,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    modalView: {
        flex: 1,
        width: "100%",
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        padding: 20,
        backgroundColor: "#FFF"
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    }
}
