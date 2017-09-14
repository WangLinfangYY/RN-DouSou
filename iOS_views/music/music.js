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
import webView from '../common/webview'
var that ;
export default class Music extends Component{
	constructor(props) {
	  super(props);
	  var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
	  this.state = {
	  	dataSource:ds.cloneWithRows([]),
	  	keywords:'偏偏喜欢你',
	  	show:false
	  };
	}
	render(){
		return(
			<ScrollView style = {styles.flex_1}>
				<View style = {[styles.search,styles.row]}>
					<View style = {styles.flex_1}>
						<Search placeholder = '请输入歌曲/歌手名称' onChangeText = {(text) => this.setState({keywords:text})}/>
					</View>
					<TouchableOpacity style = {styles.btn} onPress = {() =>this._search()}>
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
	_search(){
		this._getData();
	}
	_renderRow(row){
		var author = row.author;
		var authors =[];
		// authors = author.map((item)=>{
		// 	authors.push(item.name);
		// })
		for(var i in author){
			authors.push(author[i].name);
		}
		return(
			<View style = {styles.item}>
				<View style = {styles.center}>
					<Image style = {styles.img} source = {{uri:row.image}}/>
				</View>
				<View style = {styles.row}>
					<Text style = {[styles.flex_1,{marginLeft:20}]} numberOfLines = {1}>曲目:{row.title}</Text>
					<Text style = {styles.textWidth} numberOfLines = {0}>演唱：{authors}</Text>
				</View>
				<View style = {styles.row}>
					<Text style = {[styles.flex_1,{marginLeft:20}]} numberOfLines = {1}>时间：{row.attrs.pubdate}</Text>
					<Text style = {styles.textWidth} numberOfLines = {1}>评分：{row.rating.average}</Text>
				</View>
				<View style = {styles.center}>
					<TouchableOpacity style = {[styles.goDou,styles.center]} onPress = {()=>that._gouDouBan(row.title,row.mobile_link)}>
						<Text>详情</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
	_getData(){
		var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !==r2});
		var that = this;
		var baseURL = ServiceURL.music_search + '?count=10&q=' + this.state.keywords;
		this.setState({
			show:false,
		});
		Util.get(baseURL,
			function(data){
				if(!data){
					return alert('音乐服务出错');
				}
				var musics = data.musics;
				that.setState({
					dataSource:ds.cloneWithRows(musics),
					show:true,
				});
			},
			function(err){
				alert(err);
			}
		);
	}
	_gouDouBan(title,url){
		this.props.navigator.push({
			component:webView,
			passProps:{
				title:title,
				url:url,
				backName:'音乐'
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
		flexDirection:'row',
	},
	img:{
		width:70,
		height:70,
		borderRadius:35,
	},
	center:{
		justifyContent:'center',
		alignItems:'center'
	},
	item:{
		marginTop:10,
		borderTopWidth:Util.pixel,
		borderBottomWidth:Util.pixel,
		borderColor:'#ddd',
		paddingTop:10,
		paddingBottom:10,
	},
	textWidth:{
		width:120,
	},
	goDou:{
		height:35,
		width:60,
		borderWidth:Util.pixel,
		borderColor:'#3082FF',
		borderRadius:3,
	}

});



























