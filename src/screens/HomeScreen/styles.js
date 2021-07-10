import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    btncontainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        height: 200,
        width: 250,
        marginBottom: 100
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        width: 100,
        height: 50,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },

    userInstruction: {
        fontSize: 16,
        color: '#2e2e2d',
        fontStyle: 'italic',
        fontWeight: "bold",
        marginBottom: 30
    },
})

