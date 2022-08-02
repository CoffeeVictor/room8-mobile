import { View, Text, StyleSheet, TextInput,TouchableOpacity, ScrollView,KeyboardAvoidingView, FlatList} from "react-native"
import { colors } from "../../constants/Colors"
import { useEffect, useState } from "react";

export const CreateGroup: React.FC = () => {

    const [groupName,setGroupName] = useState('');
    const [memberName,setMemberName] = useState('');

    const [memberList,setMemberList] = useState(['Member List:']);

    const addMember = async () => {
        if(memberName != ''){
            memberList.push(memberName);
            console.log({memberList})
        }
    }

    const createGroup = async () =>{
        //TO DO: Back-end integration
        setMemberList(['Member List:'])
    }

    return(
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.formArea}>
                <TextInput
                    style={styles.formInput}
                    placeholder={'Group Name'}
                    value={groupName}
                    onChangeText={setGroupName}
                    autoCapitalize={'none'}
                />
                <TextInput
                    style={styles.formInput}
                    placeholder={'Add a member...'}
                    value={memberName}
                    onChangeText={setMemberName}
                    autoCapitalize={'none'}
                />
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity style={styles.addMemberButton} onPress={addMember}>
                    <Text style={styles.addMemberText}>
                        Add New Member
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.createGroupButton} onPress={createGroup}>
                    <Text style={styles.createGroupText}>
                        Create Group
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.memberListArea}>
                <FlatList style={styles.memberListView} data={memberList} renderItem={({item}) => <Text style={styles.listItem}>{item}</Text>}>
                </FlatList>
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
        width: '80%',
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
        width: '80%',
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
        fontSize:22,
        fontWeight:'700',
        color: colors.primary
    }
})