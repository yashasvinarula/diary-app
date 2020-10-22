import React, { Component } from 'react'
import { ScrollView, Text, View, StyleSheet, Dimensions, TouchableOpacity, ToastAndroid, Alert } from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import { AirbnbRating } from 'react-native-ratings';

import {fetchPosts, deletePost, editPost} from '../redux/actions/';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            posts: []
        }
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount(){
        this.props.fetchPosts();
    }

    componentDidUpdate(prevState, prevProps){
        if(prevState.posts.posts != this.state.posts){
            console.log('update');
            let temp = prevState.posts.posts;
            temp.sort(function(x,y){
                if(x.created_at > y.created_at){ return 1;}
                if(x.created_at < y.created_at){ return -1;}
                return 0;
            });
            this.setState({posts: temp});
        }
    }

    delete = (id) => {
        Alert.alert('Are you sure you want to delete?', 'Changes you made might not be saved',
            [  
                {  
                    text: 'Cancel',  
                    // onPress: () => console.log('Cancel Pressed'),  
                    style: 'cancel',  
                },  
                {
                    text: 'Yes, I\'\m sure', 
                    onPress: () => {
                        this.props.deletePost(id)
                        .then(() => console.log(this.props.fetchPosts()))
                        .then(() => ToastAndroid.show('Post Successfully Deleted', ToastAndroid.SHORT));
                    }
                },  
            ]  
        );
        
    }

    edit = (p) => {
        console.log('edit', p.id);
        this.props.navigation.navigate('edit', {data: p});
    }

    render() {
        const {posts} = this.state;
        const postsComponents = posts.reverse().map(post => {
            return (
                <View key = {post.id} style = {styles.postcontainer}>
                    <View style = {styles.titlecontainer}>
                        <Text style = {styles.title}>{post.title}</Text>    
                        <Text style = {styles.time}>{moment(post.created_at).fromNow()}</Text>
                        
                    </View>
                    <View style = {styles.rating}>
                        <AirbnbRating
                                count={10}
                                isDisabled = {true}
                                showRating = {false}
                                defaultRating={post.rating}
                                size={12}
                            />
                    </View>
                    <Text style = {styles.review}>{post.review}</Text>
                    {
                        post.comments.map(comment => (
                            <View style = {styles.comments}>
                                <Text style = {{fontWeight: '700'}}>{comment.name}</Text>
                                <Text>{comment.comment}</Text>
                            </View>
                        ))
                    }
                    <View style = {styles.footer}>
                        <TouchableOpacity
                            style={styles.cancel}
                            onPress={(id) => this.delete(post.id)}
                        >
                            <Text style = {styles.btntext}>Delete</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.save}
                            onPress={(p) => this.edit(post)}
                        >
                            <Text style = {styles.btntext}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        });
        return (
            <View style = {{flex: 1}}>
                <ScrollView>
                    {postsComponents}
                </ScrollView>
                <View style = {styles.bottom}>
                    <TouchableOpacity
                        style={styles.new}
                        onPress={() => this.props.navigation.navigate('addpost')}
                    >
                        <Text style = {styles.btntext}>NEW</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.search}
                        onPress={() => this.props.navigation.navigate('search')}
                    >
                        <Text style = {styles.btntext}>SEARCH</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    postcontainer: {
        width: windowWidth,
        marginTop: 10,
        marginBottom: 50,
    },
    titlecontainer: {
        width: '100%',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 30
    },
    title: {
        fontWeight: '700',
        fontSize: 16,
        height: '100%'
    },
    time: {
        fontWeight: '400',
        fontSize: 12,
        height: '100%'
    },
    rating: {
        alignSelf: 'flex-start',
        marginLeft: 12
    }, 
    review: {
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 20,
    },
    footer: {
        flexDirection: 'row',
        height: 40,
        width: windowWidth*0.9,
        justifyContent: 'space-between',
        marginTop: 10,
        marginLeft: windowWidth/20
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
    },
    bottom: {
        width: windowWidth,
        flexDirection: 'row'
    },
    new: {
        flex: 1,
        backgroundColor: '#00e676',
        height: '100%',
        padding: 20,
        alignItems: 'center',
    },
    search: {
        flex: 1,
        backgroundColor: '#ffc107',
        height: '100%',
        padding: 20,
        alignItems: 'center',
    },
    comments: {
        width: windowWidth*0.9,
        marginLeft: 15,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 4,
        margin: 2,
        padding: 2
    }
})

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps, {fetchPosts, deletePost, editPost})(Home);
