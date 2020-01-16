import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, TouchableOpacity, Image, Button  } from 'react-native';
import { withNavigation } from 'react-navigation';

class ListFilm extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true }
  }

  componentDidMount(){
    return fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=54fb0736054c2be79f6f930f4cae9a70&page=1')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.results,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  goToDetail(id){
      //alert(id);
      
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, padding: 15, marginTop: 0, backgroundColor: '#313131'}}>
        <Text style={{ textAlign: 'center', fontSize: 48, marginBottom: 5, color: 'white' }}>Popular Film</Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={
              ({item}) => 
                <TouchableOpacity style = {styles.listFilm} onPress={() => this.props.navigation.navigate('Detail', { itemId: item.id })}>
                    <Image 
                        style = {styles.thumbnail}
                        source = {{ uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path }}/>
                    <View styles={{ flexDirection: 'column'}}>
                        <Text style={styles.textTitle}>{item.title}</Text>
                        <Text style={styles.textRating}>Rating: {item.vote_average*10}%</Text>
                    </View>
                </TouchableOpacity>
            }
          keyExtractor={({id}, index) => id}
        />
        {/* <View style={{ flexDirection: 'row'}}>
            <Button title="Previous"/>
            <Button title="Next"/>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 20,
    flex: .2,
    maxWidth: 270,
    padding: 5,
    color: 'white'
  },
  textRating: {
    fontSize: 20,
    padding: 5,
    color: 'white'
  },
  thumbnail: {
      width: 100,
      height: 100
  },
  listFilm: {
      borderWidth: 1,
      backgroundColor: '#414141',
      margin: 5,
      flexDirection: 'row'
  }
});

export default withNavigation(ListFilm);