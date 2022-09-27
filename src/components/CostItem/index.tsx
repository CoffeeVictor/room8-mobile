import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '../../constants/Colors';
import { useLan } from '../../contexts/LanguageContext';
import { useUser } from '../../contexts/UserContext';

interface ICostItemProps {
  item: CostItemDTO;
  handleDelete: () => Promise<void>;
}

export type CostItemDTO = {
  name: string;
  paid_by: string;
  created_at: number;
  value: string;
  uid?: string;
};

export const CostItem: React.FC<ICostItemProps> = (props) => {
  const userContext = useUser();
  const [username, setUsername] = useState<string>();
  const { language } = useLan();

  useEffect(() => {
    userContext?.getUser(props.item.paid_by).then((user) => {
      if (!user) return;

      setUsername(user.name);
    });
  }, []);

  if (!username) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <Text style={styles.itemText}>
        {`${username} ${language.cost} R$ ${props.item.value} ${language.costTo} ${props.item.name}`}
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={props.handleDelete}
      >
        <Feather name='trash-2' color={colors.primary} size={22} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: 8,
    alignItems: 'center',
    minHeight: 46,
    paddingHorizontal: 12,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 4,
  },
});
