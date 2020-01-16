import React from 'react';
import { FlatList, ActivityIndicator, Text, View, StyleSheet, TouchableOpacity, Image, Button  } from 'react-native';
import { withNavigation } from 'react-navigation';

class ListFilm extends React.Component {
  

  constructor(props){
    super(props);
    this.state ={ isLoading: true }
  }

  componentDidMount(){
    const { navigation } = this.props;
    return fetch('https://api.themoviedb.org/3/movie/top_rated?page=' + JSON.stringify(navigation.getParam('page', 'NO-ID')), {
      method:'get',
      headers: new Headers({
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGZiMDczNjA1NGMyYmU3OWY2ZjkzMGY0Y2FlOWE3MCIsInN1YiI6IjVlMWU3MjUyNWMwNzFiMDAxMTYyZWQ1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2wlUuKXOyzctGs0M0Rs2k_sBc5d8KAFJH9jipV3jHbE'
      })
    })
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
          data={this.state.dataSource.results}
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
        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button style={{ width: 100 }} title="Previous"/>
            <Text style={styles.textRating}>{this.state.dataSource.page}</Text>
            <Button style={{ width: 100 }} title="Next" onPress={() => this.props.navigation.navigate('Home', { page: this.state.dataSource.page+1 })} />
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