import React,{Component,PropTypes} from 'react';
import{
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TabBarIOS,
	ScrollView,
	StatusBar,
}from 'react-native';

import Navigation from './common/navigation';

export default class TabBar extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	selectedTab:'图书'
	  };
	}
	render(){
		return (
			<TabBarIOS>
				<TabBarIOS.Item
					title = '图书'
					selected = {this.state.selectedTab === '图书'}
					onPress = {()=>{
						this.setState({
							selectedTab:'图书',
						});
					}}>
					<Navigation component = {<View
						style = {{backgroundColor:'red'}}/>}/>
				</TabBarIOS.Item>

				<TabBarIOS.Item
					title = '电影'
					selected = {this.state.selectedTab === '电影'}
					onPress = {()=>{
						this.setState({
							selectedTab:'电影',
						});
					}}>
					<View/>
				</TabBarIOS.Item>

				<TabBarIOS.Item
					title = '音乐'
					selected = {this.state.selectedTab === '音乐'}
					onPress = {()=>{
						this.setState({
							selectedTab:'音乐',
						});
					}}>
					<View/>
				</TabBarIOS.Item>
			</TabBarIOS>
		);
	}
}




































