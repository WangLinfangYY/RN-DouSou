import React,{Component}from 'react';
import {
	StyleSheeet,
	Text,
	View,
}from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import TabBar from '../tabbar_ios'

export default class Navigation extends Component{
	render(){
		return(
			<Navigator
				initialRoute = {{name:'TabBar',component:TabBar}}
				configureScene={()=>{
                        return  Navigator.SceneConfigs.PushFromRight;
                    }}
				renderScene = {(route,navigator)=>{
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

//				configureScene = {()=>{return Navigator.ScenceConfigs.FloatFromBottom;}}//位于row：14.
