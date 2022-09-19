import { Feather } from "@expo/vector-icons"
import { Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { CostItem, CostItemDTO } from "../../components/CostItem"
import { TopBar } from "../../components/TobBar"
import { colors } from "../../constants/Colors"
import { IAuthValue, useAuth } from "../../contexts/AuthContext"
import { useGroup } from "../../contexts/GroupContext"
import { useUser } from "../../contexts/UserContext"

interface ICostRecord {
    [key: string]: number;
}

export const Costs: React.FC = () => {

    const auth = useAuth() as IAuthValue;
    const [groupCosts, setGroupCosts] = useState<CostItemDTO[]>();
    const [newItemName, setNewItemName] = useState<string>();
    const [newItemValue, setNewItemValue] = useState<string>();

    async function fetchUserGroupCosts() {
        const userId = auth.user?.uid;

        if(!userId) return;

        const groupContext = useGroup();

        const userGroup = await groupContext?.getGroupByUser(userId);

        //@ts-ignore Bad Typing
        setGroupCosts(userGroup.costList) 
    }

    useEffect(() => {
        fetchUserGroupCosts();
    }, []);

    const handleNewItem = async () => {
        const userId = auth.user?.uid;

        if(!userId) return;
        try {
            parseFloat(newItemValue as string);
        } catch (e) {
            return;
        }

        const groupContext = useGroup();

        const userGroup = await groupContext?.getGroupByUser(userId);

        const groupId = userGroup?.groupDocID;

        if(!groupId || !newItemName || !newItemValue) return;

        setGroupCosts(undefined);

        await groupContext?.addCostItemToGroup(groupId, {
            created_at: Timestamp.fromDate(new Date()).seconds,
            name: newItemName,
            paid_by: userId,
            value: newItemValue,
        })

        await fetchUserGroupCosts();
    }

    const handleDelete = async (item: CostItemDTO) => {

        const groupContext = useGroup();

        const userId = auth?.user?.uid;

        if(!userId) return;

        const userGroup = await groupContext?.getGroupByUser(userId);

        const userGroupId = userGroup?.groupDocID;

        if(!userGroupId) return;

        await groupContext?.deleteCostItemById(userGroupId, item);

        fetchUserGroupCosts();
    }

    const calcResults = async () => {
        if(!groupCosts?.length) {
            alert('Nenhum custo adicionado ainda...')
        } else {
            let paymentRecord: ICostRecord = {};

            let totalCost = 0;
            groupCosts.forEach((item) => {

                if(!Object.keys(paymentRecord).includes(item.paid_by)) {
                    paymentRecord[item.paid_by] = 0;
                }
                const cost = parseFloat(item.value);
                totalCost += cost;
                paymentRecord[item.paid_by] += cost;
            })

            let resultString = '';

            const userContext = useUser();
            const individualCost = totalCost / Object.keys(paymentRecord).length;

            for(let [key, value] of Object.entries(paymentRecord)) {

                const username = (await userContext?.getUser(String(key)))?.name;

                const userCost = individualCost - value;

                resultString += `${username} deve ${userCost < 0 ? 'receber' : 'pagar'} R$ ${userCost}\n`
            }

            alert(resultString);
        }
    }

    return (
        <View style={styles.container}>
            <TopBar />
            <View style={styles.newCostContainer}>
                <TextInput style={styles.newCostTextInput} placeholder={'Nome'} value={newItemName} onChangeText={setNewItemName} />
                <TextInput style={styles.newCostValueInput} placeholder={'Valor'} value={newItemValue} onChangeText={setNewItemValue} keyboardType="numeric" />
                <TouchableOpacity onPress={handleNewItem} >
                    <Feather name="plus-circle" color={colors.primary} size={30} />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.calcButton} onPress={calcResults} >
                    <Text style={styles.calcButtonText} >
                        Calcular resultados
                    </Text>
                </TouchableOpacity>
            </View>
            {
                groupCosts === undefined ? <ActivityIndicator /> :

                <View style={styles.costsAreaContainer}>
                    {groupCosts.map((item, index) => <CostItem handleDelete={() => handleDelete(item)} item={item} key={index} />)}
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    costsAreaContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        width: '100%',
        paddingHorizontal: 10
    },
    newCostContainer: {
        width: '100%',
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 70
    },
    newCostTextInput: {
        minWidth: '50%',
        margin: 0,
        marginHorizontal: 5,
        backgroundColor: 'white',
        minHeight: 50,
        borderRadius: 10,
        paddingHorizontal: 8
    },
    newCostValueInput: {
        backgroundColor: 'white',
        minWidth: '20%',
        minHeight: 50,
        marginHorizontal: 5,
        borderRadius: 10,
        paddingHorizontal: 8
    },
    calcButton: {
        marginVertical: 16,
        backgroundColor: colors.primary,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 16
    },
    calcButtonText: {
        color: 'white'
    }
})