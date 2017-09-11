import React,{Component}from 'react';
import {
	StyleSheet,
	Text,
	View,
	ListView,
	Image,
	ScrollView,
	TouchalbeOpacity,
}from 'react-native'

var Icon = require('./left_icon');
var Util = require('./util');

export default class Header extends Component{
	render(){
		var obj = this.props.initObj;
		return(
			<View style = {[styles.header,styles.row,styles.center]}>
			 	<TouchalbeOpacity style = {[styles.row,styles.center]} onPress = {()=>this._pop()}>
			 		<Icon/>
			 		<Text style = {styles.fontFFF}>{obj.backName}</Text>
			 	</TouchalbeOpacity>
			 	<View style = {[styles.title,styles.center]}>
			 		<Text style = {[styles.fontFFF,styles.titlePos]}
			 			numberOfLines = {1}>{obj.title}</Text>
			 	</View>
			</View>
			);
	}
	_pop(){
		this.props.navigator.pop();
	}
}

var styles = StyleSheet.create(){
	row:{
		flexDirection:'row'
	},
	header:{
		height:50,
		backgroundColor:'#33497FF'
	},
	fontFFF:{
		color:'#fff',
		fontSize:17,
		fontWeight:'bold',
	},
	title:{
		flex:1,
	},
	titlePos:{
		marginLeft:-20,width:200,
	},
	center:{
		justifyContent:'center',
		alignItems:'center',
	},
} 


























