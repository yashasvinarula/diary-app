import React, { Component } from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './redux/store';

import AddPost from './pages/AddPost';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Search from './pages/Search';

const Stack = createStackNavigator();

export class App extends Component {
    render() {
        return (
          <Provider store = {store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName = 'home'>
                  <Stack.Screen name="home" component={Home} />
                  <Stack.Screen name="addpost" component={AddPost} />
                  <Stack.Screen name="edit" component={Edit} />
                  <Stack.Screen name="search" component={Search} />
                </Stack.Navigator>
            </NavigationContainer>
          </Provider>
        )
    }
}

export default App