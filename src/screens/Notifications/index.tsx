import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopBar } from '../../components/TobBar';
import { colors } from '../../constants/Colors';
import { useLan } from '../../contexts/LanguageContext';

export const Notifications: React.FC = () => {
  const { language } = useLan();

  return (
    <View style={styles.container}>
      <TopBar></TopBar>
      <SafeAreaView style={styles.view}>
        <Text style={styles.textHead}>{language.notifications}</Text>
        <Text style={styles.text}>{language.noNotifications}</Text>
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
