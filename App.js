import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListFilm from './components/ListFilm';
import DetailFilm from './components/DetailFilm';
import  ReactNativeGestureHandler from 'react-native-gesture-handler';
import { createAppContainer, StackNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class FilmHome extends React.Component{
  render(){
    return (
      <View style={styles.container}>
        <ListFilm/>
      </View>
    )
  }
}

class FilmDetail extends React.Component {
  render(){
    return (
      <View style={styles.container}>
        <DetailFilm/>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: ListFilm,
    Detail: DetailFilm
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#ca3e47',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

// const AppContainer = createAppContainer(AppNavigator);
export default createAppContainer(AppNavigator);

// export default function App() {
//   return (
//     <View style={styles.container}>
//         <ListFilm/>
//     </View>

//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

