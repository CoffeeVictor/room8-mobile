import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopBar } from '../../components/TobBar';
import { colors } from '../../constants/Colors';

export const Notifications: React.FC = () => {
  return (
    <View style={styles.container}>
      <TopBar></TopBar>
      <SafeAreaView style={styles.view}>
        <Text style={styles.textHead}>Notifications</Text>
        <Text style={styles.text}>No notifications found</Text>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: colors.heading,
    fontSize: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  textHead: {
    color: colors.primary,
    fontSize: 30,
    alignItems: 'center',
  },
  view: {
    marginBottom: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});
