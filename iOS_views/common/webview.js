import React,{Component,PropStyles} from 'react';
import {
	WebView,
	View,
} from 'react-native';
import Header from './header';
import Util from './util';
export default class Web extends Component{
	render(){
		return(
			<View style = {{width:Util.size.width,height:Util.size.height,backgroundColor:'white'}}>
				<Header
					navigator = {this.props.navigator}
					initObj = {{
						backName:this.props.backName,
						title:this.props.title
					}}/>
				<WebView
					contentInset = {{top:-40}}
					startInLoadingSate = {true}
					style = {{width:Util.size.width,height:Util.size.height - 50}}
					source = {{uri:this.props.url}}></WebView>
			</View>
		);
	}
}