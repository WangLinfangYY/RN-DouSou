import React,{Component}from 'react';
import {
	StyleSheeet,
	Text,
	View,
}from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-component';

export default class Navigation extends Component{
	render(){
		return(
			<Navigator
				initialRoute = {{name:'',component:this.props.component,index:0}}
				configureScene = {()=>{return Navigator.ScenceConfig.FloatFromBottom;}}
				renderScence = {(route,navigator)=>{
					const Component = route.component;
					return(
						<View style = {{flex:1}}>
							<Component navigator = {navigator} route = {route} {...route.passProps}/>
						</View>
						);
				}}/>
			);
	}
}