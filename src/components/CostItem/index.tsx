import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { UserService } from "../../backend/services/user.service";
import { colors } from "../../constants/Colors";

interface ICostItemProps {
    item: CostItemDTO,
    handleDelete: () => Promise<void>
}

export type CostItemDTO = {
    name: string;
    paid_by: string;
    created_at: number;
    value: string;
    uid?: string;
}

export const CostItem: React.FC<ICostItemProps> = (props) => {

    const [username, setUsername] = useState<string>();

    useEffect(() => {
        const userService = new UserService();
        userService.getUser(props.item.paid_by).then(user => {
            if(!user) return;

            setUsername(user.name);
        })
    }, []);

    if(!username) return <ActivityIndicator />

    return (
        <View style={styles.container}>
            <Text style={styles.itemText}>
                {`${username} pagou R$ ${props.item.value} em ${props.item.name}`}
            </Text>
            <TouchableOpacity style={styles.deleteButton} onPress={props.handleDelete} >
                <Feather name="trash-2" color={colors.primary} size={22} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 8,
        alignItems: 'center',
        minHeight: 46,
        paddingHorizontal: 12,
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    deleteButton: {
        padding: 4,
    }
})