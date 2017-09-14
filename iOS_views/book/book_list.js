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
import BookItem from './book_item'
import BookDetail from './book_detail'

let that;
export default class Book extends Component{
	constructor(props) {
	  super(props);
	  var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
	  this.state = {
	  	dataSource:ds.cloneWithRows([]),
	  	keywords:'c语言',
	  	show:false,
	  };
	}
	render(){
		return(
			<ScrollView style = {styles.flex_1}>
				<View style = {[styles.search,styles.row]}>
					<View style = {styles.flex_1}>
						<Search placeholder = "请输入图书的名字" onChangeText = {(text)=>this.setState({keywords:text})}/>
					</View>
					<TouchableOpacity style = {styles.btn} onPress = {()=>this._search()}>
						<Text style = {styles.fontFFF}>搜索</Text>
					</TouchableOpacity>
				</View>
				{
					this.state.show ? 
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
		this.getData();
	}
	//渲染图书列表项
	_renderRow(row){
		return(
			<BookItem row = {row} onPress = {()=>that._loadPage(row.id)}/>
			);
	}
	_search(){
		this.getData();
	}
	//根据关键字查询
	getData(){
		var ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});
		var baseURL = ServiceURL.book_search +'?count=10&q=' + this.state.keywords;
		//开启loading
		this.setState({
			show:false
		});
		Util.get(baseURL,
			(response)=>{
				// alert(baseURL+'---->'+response.count);
			if(!response){
				alert('图书数据请求有误');
			}
			var books = response.books;
			that.setState({
				dataSource:ds.cloneWithRows(books),
				show:true,
			});
			},
			(err)=>{
			alert(err);
		});
	}
	_loadPage(id){
		this.props.navigator.push({
			component:BookDetail,
			passProps:{
				id:id,
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
		alignItems:'center',
	},
	fontFFF:{
		color:'#fff'
	},
	row:{
		flexDirection:'row',
	},
});






























