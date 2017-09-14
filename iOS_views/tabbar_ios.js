import React,{Component,PropTypes} from 'react';
import{
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TabBarIOS,
	ScrollView,
	StatusBar,
	NavigatorIOS,
}from 'react-native';
// import {Navigator}
//  from 'react-native-deprecated-custom-components'

import Navigation from './common/navigation';

import Book from './book/book_list'
import Movie from './movie/movie' 
import Music from './music/music'
export default class TabBar extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	selectedTab:'图书'
	  };
	}
	render(){
		const {navigator} = this.props;
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
					<Book navigator={navigator}/>
				</TabBarIOS.Item>

				<TabBarIOS.Item
					title = '电影'
					selected = {this.state.selectedTab === '电影'}
					onPress = {()=>{
						this.setState({
							selectedTab:'电影',
						});
					}}>
					<Movie navigator={navigator}/>
				</TabBarIOS.Item>

				<TabBarIOS.Item
					title = '音乐'
					selected = {this.state.selectedTab === '音乐'}
					onPress = {()=>{
						this.setState({
							selectedTab:'音乐',
						});
					}}>
					<Music navigator={navigator}/>
				</TabBarIOS.Item>
			</TabBarIOS>
		);
	}
}




































