import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        alignItems: 'center',
    },
    title: {

    },
    logo: {
        height: 200,
        width: 250,
        alignSelf: "center",
        margin: 15
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    inputQty: {
        color: '#000',
        fontSize: 16,
        lineHeight: 23,
        flex: 1
    },
    label: {
        fontSize: 16,
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1,
        marginLeft: 5
    },
    labelKG: {
        fontSize: 16,
    },
    iconContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,

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
        marginTop: 10,
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
        marginBottom: 10,
        marginRight: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

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
        fontSize: 20,
        margin: 2,
    },
    userContainer: {
        alignItems: 'center',
        paddingTop: 5,

    },
    errorText: {
        color: "red",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: 'center',
        fontStyle: 'italic',
        margin: 1
    },
    PickerInput: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        textAlignVertical: 'center',
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 45,
        marginRight: 30,
        paddingLeft: 16,
        borderWidth: 1

    },
    itemContainer: {
        margin: 10,
        // alignSelf: 'center'
    },



})