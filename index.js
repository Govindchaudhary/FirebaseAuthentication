import { AppRegistry,View } from 'react-native';
import React, {Component} from 'react';
import firebase from 'firebase';
import Header from './src/components/Header';
import LoginForm from './src/components/LoginForm';
import Button from './src/components/Button';
import Spinner from './src/components/Spinner';
import CardSection from './src/components/CardSection';

class App extends Component {
    state ={loggedIn:null};
    
    componentWillMount() { // automatically called just before rendering
        firebase.initializeApp({
            apiKey: "AIzaSyDpRXHwEr4Kj_xBE3XEEXz2-RcKYIN-JYs",
            authDomain: "authentication-642ee.firebaseapp.com",
            databaseURL: "https://authentication-642ee.firebaseio.com",
            projectId: "authentication-642ee",
            storageBucket: "authentication-642ee.appspot.com",
            messagingSenderId: "193600998499"
          });
 // onAuthstatechanged function invokes its callback whenever user changes its state ie login or logout
          firebase.auth().onAuthStateChanged((user)=>{
              if(user) 
                  this.setState({loggedIn:true});
              else
                 this.setState({loggedIn:false});

          });
    }
    renderContent() {
        switch(this.state.loggedIn)
        {
            case true:
              return(
                  <CardSection>
                      <Button onPress = {()=>firebase.auth().signOut()}>
                         Log Out
                      </Button>
                  </CardSection>
              ); 
            case false:
               return <LoginForm/>;
            default:
               return(
                   <View style = {styles.spinnerStyle}>
                     <Spinner/>
                   </View>

               );
        }
       
    }
    
    
    render(){
        return(
            <View>
                <Header headerText="Authentication"/>
                {this.renderContent()}
            </View>
        );
    };
}
const styles = {
    spinnerStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
};

AppRegistry.registerComponent('authentication', () => App);
