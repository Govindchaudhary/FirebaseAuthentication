import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';

import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import Input from './Input';
import Spinner from './Spinner';



class LoginForm extends Component {
    // if loading is false we show button otherwise show the spinner.
    state = {email:'',password:'',error:'',loading:false};
    
    onButtonPress() {
        this.setState({error:'',loading:true}); //to make sure that every time we press button no message appear before authentication
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(this.onLoginSuccess.bind(this))
        .catch(()=> {
            firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFailure.bind(this));
        });
    }
    onLoginSuccess() {
        this.setState(
        { 
            email:'',
            password:'',
            loading:false,
            error:''
        });
    }
    onLoginFailure() {
        this.setState({error:"Authentication Failed",loading:false});
    }

   

 // you need to explicitly bind a function, if you want to pass it to any react component,
 // as sometimes it doesn't bind implicitly.otherwise value of this will be null and hence show error  
    renderButton() {
        if(this.state.loading) {
           return <Spinner/>;
        }
        else {
            return(
            <Button onPress = {this.onButtonPress.bind(this)}>
               Log In
            </Button>
            );
            
        }
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                    label = "Email"
                    placeholder = "user@gmail.com"
                    value = {this.state.email}
                    //take  'input' as argument and set email as this 'input'
                    onChangeText = {input => this.setState({email:input})}
                    
                    />
    
                </CardSection>
    
                <CardSection>
                    <Input
                    label = "Password"
                    placeholder = "password"
                    secureTextEntry = {true}
                    value = {this.state.password}
                    //take  'input' as argument and set password as this 'input'
                    onChangeText = {input => this.setState({password:input})}
                    
                    />
    
                </CardSection>
                <Text style={styles.errorStyle}>
                    {this.state.error}
                </Text>
    
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );

    };
    
}
const styles = {
    errorStyle:{
        fontSize:20,
        alignSelf:'center',
        color:'red'
    }

};
export default LoginForm;