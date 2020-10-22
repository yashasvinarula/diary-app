import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Dimensions, TouchableOpacity, ScrollView, ToastAndroid, ActivityIndicator, Image, Linking} from 'react-native'
import axios from 'axios';
const {keys} = require('../utils/keys');

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            loading: false,
            result: false,
            details: {
                author: '',
                description: '',
                image: null,
                pageCount: 0,
                infoLink: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
    }

    handleChange = (key, value) => {
        this.setState({[key]: value});
    }

    search = () => {
        this.setState({loading: true})
        const {title} = this.state;
        if(title.trim().length > 0){
            axios.get(`https://www.googleapis.com/books/v1/volumes?q={${title}}`)
            .then(data => {
                if(data.data.items.length>0){
                    this.setState({loading: false, result: true});
                    let temp = data.data.items[0].volumeInfo
                    let obj = {}
                    obj.authors = temp.authors.join('');
                    obj.description = temp.description;
                    obj.image = temp.imageLinks.thumbnail;
                    obj.pageCount = temp.pageCount;
                    obj.infoLink = temp.infoLink;
                    this.setState({loading: false, result: true, details: obj}) 
                }else{
                    this.setState({
                        loading: false,
                        result: false
                    })
                    ToastAndroid.show('Sorry, no results found', ToastAndroid.SHORT)
                }
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    result: false
                })
                ToastAndroid.show('Some problem occurred, please retry', ToastAndroid.SHORT)
            })
        }else{
            this.setState({
                loading: false,
            });
            ToastAndroid.show('Title cant be empty', ToastAndroid.SHORT)
        }
    }

    render() {
        const {title, loading, details, result} = this.state;
        console.log(details.image);
        return (
            <View style = {styles.container}>
                <View>
                    <TextInput
                        placeholder = 'Enter the title' 
                        style = {styles.title}
                        value = {title}
                        onChangeText = {(text) => this.handleChange('title', text)}
                    />
                </View>
                <ScrollView>
                    {
                        result && (
                            <View style = {{alignItems: 'center', padding: 10, marginBottom: 10}}>
                                <Image 
                                    style = {styles.image}
                                    source = {{uri: details.image}}
                                />
                                <Text style ={{fontWeight: '700', fontSize: 20}}>
                                    By: {details.authors}
                                </Text>
                                <Text style = {{marginTop: 10, marginBottom: 10, fontWeight: '700'}}>
                                    {details.pageCount} pages
                                </Text>
                                <Text style = {{marginTop: 10, marginBottom: 10}}>
                                    {details.description}
                                </Text>
                                <Text style = {{marginTop: 10, textDecorationStyle: 'underline', fontWeight: '700'}}>
                                    Link to the book: {'\n'}
                                </Text>
                                <Text style = {{textDecorationStyle: 'underline', color: 'blue'}} onPress = {() => Linking.openURL(details.infoLink)}>
                                    {details.infoLink}
                                </Text>
                            </View>
                        )
                    }
                </ScrollView>
                <View style = {styles.bottom}>
                    <TouchableOpacity
                        style={styles.new}
                        onPress={() => this.search()}
                    >
                        {
                            loading===true?(
                                <ActivityIndicator size="small" color="#fff" />
                            ):(
                                <Text style = {styles.btntext}>SEARCH</Text>
                            )
                        }
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },  
    title: {
        width: windowWidth*0.9,
        borderBottomWidth: 1,
        borderBottomColor: '#808080',
        padding: 1,
        fontSize: 20,
        fontWeight: '700',
        marginTop: 10,
    },
    bottom: {
        width: windowWidth,
        height: 60
    },
    btntext: {
        fontSize: 14,
        fontWeight: '700',
        color: 'white',
    },
    new: {
        flex: 1,
        backgroundColor: '#1976d2',
        alignItems: 'center',
        height: '100%',
        padding: 20
    },
    image: {
        marginTop: 30,
        marginBottom: 30,
        width: 150,
        height: 200,
        alignSelf: 'center'
    }
});

export default Search
