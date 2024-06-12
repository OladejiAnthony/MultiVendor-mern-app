import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useRoute } from '@react-navigation/native'
import FoodPage from '../screens/FoodPage';
import OrderPage from '../screens/OrderPage';

const Stack = createNativeStackNavigator();

const FoodNavigator = () => {
  const route = useRoute(); //here, we received the data from the component through useRoute() hook
  const item = route.params //we put the data into the item variable. Then we pass the item variable into the food-page as our initial Parameter on the food-page.
  //Note - we received the item prop as initial parameter, to be used on the foodpage/screen.

  return (
    <Stack.Navigator
        initialRouteName='food-page'
    >
        <Stack.Screen
            name='food-page'
            component={FoodPage}
            options={{headerShown: false}}
            initialParams={{item: item}}
        />
        
        <Stack.Screen
            name='order-page'
            component={OrderPage}
            options={{headerShown: false, presentation: "modal"}}
        />
    </Stack.Navigator>
  )
}

export default FoodNavigator

const styles = StyleSheet.create({})

