import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AuthScreen } from '../screens/AuthScreen';
import { Costs } from '../screens/Costs';
import { CreateGroup } from '../screens/CreateGroup';
import { Home } from '../screens/Home';
import { Notifications } from '../screens/Notifications';
import { ShoppingList } from '../screens/Shopping-List';
import { CreatProduct } from '../screens/Shopping-List/CreateProduct';
import { ToDoListPage } from '../screens/To-do';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const TAB_ICONS: {
  [key: string]: JSX.Element;
} = {
  Home: <AntDesign name={'home'} />,
  Notifications: <FontAwesome5 name='bell' />,
  Costs: <FontAwesome name='dollar' />,
  Add: <AntDesign name='pluscircleo' />,
  ToDoList: <AntDesign name='checkcircle' />,
  ShoppingList: <AntDesign name='shoppingcart' />,
};

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
  const auth = useAuth();
  const isLogged = auth?.user;

  return (
    <Stack.Navigator>
      {isLogged ? (
        <Stack.Screen
          name='Root'
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name='AuthScreen'
          component={AuthScreen}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name='Create'
        component={CreateGroup}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='ToDoList' component={ToDoListPage} />
      <Stack.Screen name='ShopList' component={ShoppingList} />
      <Stack.Screen
        name='CreatProduct'
        component={CreatProduct}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => getTabIcon('Home'),
        }}
      />
      <BottomTab.Screen
        name='Notifications'
        component={Notifications}
        options={{
          headerShown: false,
          tabBarIcon: () => getTabIcon('Notifications'),
        }}
      />
      <BottomTab.Screen
        name='Costs'
        component={Costs}
        options={{
          headerShown: false,
          tabBarIcon: () => getTabIcon('Costs'),
        }}
      />
      <BottomTab.Screen
        name='To Do List'
        component={ToDoListPage}
        options={{
          headerShown: false,
          tabBarIcon: () => getTabIcon('ToDoList'),
        }}
      />
      <BottomTab.Screen
        name='Shopping List'
        component={ShoppingList}
        options={{
          headerShown: false,
          tabBarIcon: () => getTabIcon('ShoppingList'),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
// }

function getTabIcon(name: string) {
  return TAB_ICONS[name];
}
