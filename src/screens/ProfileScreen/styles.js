import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 30
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 50,
        width: 50,
        alignSelf: "center",
        margin: 40
    },
    input: {
        color: '#000',
        paddingRight: 15,
        fontSize: 16,
        lineHeight: 23,
        flex: 2
    },
    label: {
        fontSize: 16,
        paddingLeft: 15,
        paddingRight: 15,

    },
    btncontainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btn: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        width: 100,
        height: 50,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    inputContainer: {
        height: 50,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginRight: 20,
        marginLeft: 20

    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 50,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    userInstruction: {
        fontSize: 16,
        color: '#2e2e2d',
        fontStyle: 'italic',
        fontWeight: "bold",
    },
    userName: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 25,
        marginTop: 15

    },
    userContainer: {
        alignItems: 'center',
        paddingTop: 5,

    },
    errorText: {
        color: "red",
        fontWeight: "bold",
        fontSize: 20,
        alignSelf: 'center',

    }



})