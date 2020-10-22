import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TextInput, TouchableOpacity, Alert, ToastAndroid} from 'react-native'
import { Rating, AirbnbRating } from 'react-native-ratings';
import {connect} from 'react-redux';
import {editPost} from '../redux/actions/';

const {makeid} = require('../utils/randomid');


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Edit extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            review: '',
            rating: 10,
            id: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.discard = this.discard.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount(){
        this.setState({
            title: this.props.route.params.data.title,
            review: this.props.route.params.data.review,
            rating: this.props.route.params.data.rating,
            id: this.props.route.params.data.id
        })
    }


    handleChange = (key, value) => {
        this.setState({
            [key]: value
        });
    }

    save = () => {
        const {
            title,
            review,
            rating,
            id
        } = this.state;
        const data = {
            id: id,
            title: title,
            review: review,
            comments: [
                {
                    id: makeid(10),
                    name: 'Parent 1',
                    comment: 'Well written'
                },
                {
                    id: makeid(10),
                    name: 'Parent 2',
                    comment: 'Well said'
                }
            ],
            created_at: Date.now()
        }
        if(title.trim().length > 0 && review.trim().length > 0){
            this.props.editPost(data)
            .then(res => {
                ToastAndroid.show("Post Updated Successfully!", ToastAndroid.SHORT);
                this.props.navigation.reset({index:0, routes: [{ name: 'home' }]});
            });
        }else{
            Alert.alert('Some fields are required', 'Some fields might have been ommitted while submittig the post. Please make sure to provide all the necessary data');
        }
    }

    discard = () => {
        Alert.alert('Are you sure you want to cancel?', 'Changes you made might not be saved',
            [  
                {  
                    text: 'Cancel',  
                    // onPress: () => console.log('Cancel Pressed'),  
                    style: 'cancel',  
                },  
                {
                    text: 'Yes, I\'\m sure', 
                    onPress: () => this.props.navigation.reset({index:0, routes: [{ name: 'home' }]})
                },  
            ]  
        );
    }

    render() {
        const {title, review, id, rating} = this.state;
        return (
            <View style = {styles.view}>
                <TextInput 
                    placeholder = 'Title of the book'
                    style = {styles.title}
                    value = {title}
                    onChangeText = {(text) => this.handleChange('title', text)}
                />
                <TextInput
                    multiline={true}
                    numberOfLines={1}
                    placeholder = 'What do you think?'
                    style = {styles.review}
                    value = {review}
                    onChangeText = {(text) => this.handleChange('review', text)}
                />
                <Text style = {styles.rating}>
                    Rate the book out of 10
                </Text>
                <AirbnbRating
                    count={10}
                    defaultRating={rating}
                    size={30}
                    showRating = {false}
                    onFinishRating = {(value) => this.handleChange('rating', value)}
                />
                <View style = {styles.footer}>
                    <TouchableOpacity
                        style={styles.cancel}
                        onPress={this.discard}
                    >
                        <Text style = {styles.btntext}>Discard</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.save}
                        onPress={this.save}
                    >
                        <Text style = {styles.btntext}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        height: windowHeight,
        width: windowWidth,
        paddingTop: 30,
        alignItems: 'center'
    },
    title: {
        width: windowWidth*0.9,
        borderBottomWidth: 1,
        borderBottomColor: '#808080',
        padding: 1,
        fontSize: 16,
        fontWeight: '700',
    },
    review: {
        width: windowWidth*0.9,
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#808080',
        fontSize: 12
    },
    rating: {
        fontSize: 16,
        paddingTop: 30,
    },
    footer: {
        flexDirection: 'row',
        height: 40,
        width: windowWidth*0.9,
        justifyContent: 'space-between',
        marginTop: 60
    },
    cancel: {
        backgroundColor: '#ef5350',
        height: '100%',
        width: 140,
        padding: 10,
        alignItems: 'center',
    },
    save: {
        backgroundColor: '#0288d1',
        height: '100%',
        width: 140,
        padding: 10,
        alignItems: 'center',
    },
    btntext: {
        fontSize: 14,
        fontWeight: '700',
        color: 'white'
    }
});


export default connect(null, {editPost})(Edit);
