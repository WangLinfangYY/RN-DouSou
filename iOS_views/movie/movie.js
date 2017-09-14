import React,{Component,PropTypes} from 'react';
import {
	StyleSheet,
	Text,
	View,
	ListView,
	Image,
	TouchableOpacity,
	ScrollView,
	NavigatorIOS,
}from 'react-native';

import Search from '../common/search'
import Util from '../common/util'
import ServiceURL from '../common/service'
import Web_View from '../common/webview'

var that;
export default class Movie extends Component{
	constructor(props) {
	  super(props);
	  var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
	  this.state = {
	  	dataSource:ds.cloneWithRows([]),
	  	keywords:'幸福',
	  	show:false,
	  };
	}
	render(){
		return(
			<ScrollView style = {styles.flex_1}>
			<View style = {[styles.search,styles.row]}>
				<View style = {styles.flex_1}>
					<Search placeholder = '请输入电影名称' onChangeText = {(text)=>this.setState({keywords:text})}/>
				</View>
				<TouchableOpacity style = {styles.btn} onPress = {()=>this._search()}>
					<Text style = {styles.fontFFF}>搜索</Text>
				</TouchableOpacity>
			</View>
			{
				this.state.show?
				<ListView
					dataSource = {this.state.dataSource}
					renderRow = {this._renderRow}
				/>
				:Util.loading
			}
			</ScrollView>
		);
	}
	componentDidMount(){
		that = this;
		this._getData();
	}
	_renderRow(row){
		var casts = row.casts;
		var names = [];
		for(var i in casts){
			names.push(casts[i].name);
		}
		return(
			<View style = {[styles.row,styles.item]}>
				<View>
					<Image style = {styles.img} source = {{uri:row.images.medium}}/>
				</View>
				<View>
					<Text style = {styles.textWidth} numberOfLines = {1}>名称：{row.title}</Text>
					<Text style = {styles.textWidth} numberOfLines = {0}>演员：{names}</Text>
					<Text style = {styles.textWidth} numberOfLines = {1}>评分：{row.rating.average}</Text>
					<Text style = {styles.textWidth} numberOfLines = {1}>时间：{row.year}</Text>
					<Text style = {styles.textWidth} numberOfLines = {1}>标签：{row.genres}</Text>
					<TouchableOpacity style = {styles.goDou} onPress = {()=>that._goDouBan(row.title,row.alt)}>
						<Text>详情</Text>
					</TouchableOpacity>
				</View>
			</View>
			);
	}
	_search(){
		this._getData();
	}
	_getData(){
		var ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !==r2});
		var that = this;
		var baseURL = ServiceURL.movie_search + '?count=10&q=' +this.state.keywords;
		this.setState({
			show:false,
		});
		Util.get(baseURL,
			function(data){
				if(!data){
					return alert('电影服务出错');
				}
				var subjects = data.subjects;
				that.setState({
					dataSource:ds.cloneWithRows(subjects),
					show:true
				});
			},
			function(err){
				alert(err);
			}
		);
	}
	_goDouBan(title,url){
		this.props.navigator.push({
			component:Web_View,
			passProps:{
				backName:'电影',
				title:title,
				url:url,
			}
		});
	}
}

var styles = StyleSheet.create({
	flex_1:{
		flex:1,
		marginTop:5,
	},
	search:{
		paddingLeft:5,
		paddingRight:5,
		height:45,
	},
	btn:{
		width:50,
		backgroundColor:'#0091FF',
		justifyContent:'center',
		alignItems:'center'
	},
	fontFFF:{
		color:'#fff'
	},
	row:{
		flexDirection:'row'
	},
	img:{
		width:80,
		height:110,
		resizeMode:Image.resizeMode.contain,
	},
	textWidth:{
		// width:200,
		marginLeft:10,
		marginRight:80,
	},
	item:{
		marginTop:10,
		// height:140,
		paddingTop:15,
		paddingBottom:10,
		paddingLeft:10,
		borderBottomWidth:Util.pixel,
		borderTopWidth:Util.pixel,
		borderColor:'#ddd',
	},
	goDou:{
		marginTop:10,
		justifyContent:'center',
		alignItems:'center',
		height:32,
		width:60,
		borderWidth:Util.pixel,
		borderColor:'#3C9BFD',
		marginLeft:30,
		marginTop:10,
		borderRadius:3,
	}
});





















