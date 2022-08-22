import { View, Text, StyleSheet, TextInput,TouchableOpacity, ScrollView,KeyboardAvoidingView, FlatList} from "react-native"
import { colors } from "../../../constants/Colors"
import { useEffect, useState } from "react";
import { TopBar } from '../../../components/TobBar';

export const CreateGroup: React.FC = () => {

    const [groupName,setGroupName] = useState('');


    return(
        <KeyboardAvoidingView style={styles.container}>
            <TopBar></TopBar>
            <View style={styles.formArea}>
                <Text style={styles.listItem}>Name the group you wish to create:</Text>
                <TextInput
                    style={styles.formInput}
                    placeholder={'Group Name'}
                    value={groupName}
                    onChangeText={setGroupName}
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity style={styles.createGroupButton}>
                    <Text style={styles.createGroupText}>
                        Create Group
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    formArea: {
        flex: 0.3,
        width: '90%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    formInput: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 15,
    },
    buttonArea:{
        flex: 0.2,
        width: '90%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        paddingTop: 50
    },
    addMemberButton: {
        backgroundColor: 'white',
        borderColor: colors.primary,
        borderWidth: 2,
        marginTop: 5,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    addMemberText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: '700'
    },
    createGroupButton: {
        backgroundColor: colors.primary,
        width: '100%',
        padding: 15,
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    createGroupText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700'
    },
    memberListArea:{
        flex: 0.4,
        width: '80%',
    },
    memberListView:{
        paddingVertical:40,
    },
    listItem:{
        fontSize:20,
        fontWeight:'700',
        color: colors.primary
    }
})