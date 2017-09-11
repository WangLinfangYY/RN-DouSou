import React,{Component}from 'react';
import{
	StyleSheeet,
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
var styles = StyleSheeet.create({
	go:{
		borderLeftWidth:4 * Util.pixel,
		borderBottomWidth:4 * Util.pixel,
		width:15,
		height:15,
		transfrom:[{rotate:'45deg'}],
		borderColor:'#FFF',
		marginLeft:10
	}
});