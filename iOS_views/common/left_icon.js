import React,{Component,PropTypes}from 'react';
import{
	StyleSheet,
	Text,
	View,
}from 'react-native';
import Util from './util';

export default class LeftIcon extends Component{
	render(){
		return(
			<View>
				<View style = {styles.go}/>
			</View>
		);
	}

}
var styles = StyleSheet.create({
	go:{
		borderLeftWidth:4 * Util.pixel,
		borderBottomWidth:4 * Util.pixel,
		width:12,
		height:12,
		transform:[{rotate:'45deg'}],
		borderColor:'#FFF',
		marginLeft:10
	},
});