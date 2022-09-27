import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LanguangeProvider } from './src/contexts/LanguageContext';
import { AuthProvider } from './src/contexts/AuthContext';
import { GroupProvider } from './src/contexts/GroupContext';
import { UserProvider } from './src/contexts/UserContext';

import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AuthProvider>
          <LanguangeProvider>
            <UserProvider>
              <GroupProvider>
                <Navigation />
              </GroupProvider>
            </UserProvider>
          </LanguangeProvider>
        </AuthProvider>
        <StatusBar style='inverted' />
      </SafeAreaProvider>
    );
  }
}
