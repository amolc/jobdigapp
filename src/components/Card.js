import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

export default function Card() {

    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.cirecled}>BL</Text>
                <View style={styles.sub}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                    }}>Beverly Lee</Text>
                    <Text style={{
                        color: 'grey'
                    }}>AECOM</Text>
                </View>
            </View>
            <View style={styles.bottom}>
            <Text style={{
                color: 'white',

            }}>Awaiting Feedback</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 8,
        elevation: 4
    },
    row: {
        flexDirection: 'row',
    },
    cirecled: {
        backgroundColor: "purple",
        borderRadius: 360,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 20,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    sub: {
        justifyContent: 'center',
        marginLeft: 20
    },
    bottom: {
        marginTop: 20,
        backgroundColor: 'tomato',
        width: '60%',
        padding: 5,
        borderRadius: 14,
        paddingHorizontal: 20,
        alignItems: 'center',
    }
})