import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, TouchableOpacity, Image, Button, ScrollView  } from 'react-native';

export default class DetailFilm extends React.Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true }
    }
    
    componentDidMount(){
        const { navigation } = this.props;
        console.log('id' + this.props.itemId);
        return fetch(
            'https://api.themoviedb.org/3/movie/'+ JSON.stringify(navigation.getParam('itemId', 'NO-ID')),
            {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGZiMDczNjA1NGMyYmU3OWY2ZjkzMGY0Y2FlOWE3MCIsInN1YiI6IjVlMWU3MjUyNWMwNzFiMDAxMTYyZWQ1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2wlUuKXOyzctGs0M0Rs2k_sBc5d8KAFJH9jipV3jHbE'
                })
            })//fetch
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function(){

                });

            })
            .catch((error) =>{
                console.error(error);
            });
    } 

    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                   <ActivityIndicator/>
                </View>
            )
        }

        return(
            <ScrollView style={{ backgroundColor: '#313131' }} >
                <View style={{flex: 1, padding: 15, marginTop: 10}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image 
                            style = {styles.thumbnail}
                            source = {{ uri: 'https://image.tmdb.org/t/p/w500' + this.state.dataSource.poster_path }}/>
                        <Image 
                            style = {styles.thumbnail}
                            source = {{ uri: 'https://image.tmdb.org/t/p/w500' + this.state.dataSource.backdrop_path }}/>
                    </View>
                    <Text style={styles.textDesc}>Genres: </Text>
                    <FlatList
                        horizontal={true} 
                        data={this.state.dataSource.genres}
                        renderItem={
                            ({item}) =>
                                <Text style={styles.textGenre}>{item.name}</Text>
                        } />
                    <View styles={{ flexDirection: 'column'}}>
                        <Text style={styles.textTitle}>{this.state.dataSource.title}</Text>
                        <Text style={styles.textTag}>{this.state.dataSource.tagline}</Text>
                        <Text style={styles.textDesc}>Description: {this.state.dataSource.overview}</Text>
                        <Text style={styles.textDesc}>Homepage: {this.state.dataSource.homepage}</Text>
                        <Text style={styles.textDesc}>Production Companies:</Text>
                    </View>
                    <FlatList
                        horizontal={true} 
                        data={this.state.dataSource.production_companies}
                        renderItem={
                            ({item}) =>
                                <View style={{ flexDirection: 'column', backgroundColor: '#525252', borderWidth: 1, borderColor: '#414141',}}>
                                    <Image
                                        style={styles.icon}
                                        source={{ uri: 'https://image.tmdb.org/t/p/w500' + item.logo_path }} />
                                    <Text style={styles.textDesc}>{item.name}</Text>
                                </View>
                        } />    
                </View>
                
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 24,
    flex: .2,
    maxWidth: 270,
    marginTop: 5,
    color: 'white'
  },
  textTag: {
    fontSize: 18,
    padding: 5,
    color: 'white'
  },
  textDesc: {
    fontSize: 16,
    padding: 5,
    color: 'white'
  },
  textGenre: {
    fontSize: 14,
    padding: 5,
    backgroundColor: '#525252',
    borderWidth: 1,
    borderColor: '#414141',
    margin: 1,
    color: 'white'
  },
  thumbnail: {
      width: 150,
      height: 150,
      margin: 5
  },
  icon: {
      width: 160,
      height: 90,
      margin: 5,
      resizeMode: 'stretch'
  },
  listFilm: {
      borderWidth: 1,
      margin: 5,
      flexDirection: 'row'
  }
});