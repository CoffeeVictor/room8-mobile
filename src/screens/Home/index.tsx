import { Text, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";

export const Home: React.FC = () => {

    const auth = useAuth();

    return (
        <View>
            <Text>
                Bem vindo {auth?.user?.email}
            </Text>
        </View>
    )
}