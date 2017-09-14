import React,{Component,PropTypes} from 'react'
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	ListView,
	Image,
	ScrollView,
	TouchableOpacity,
} from 'react-native'

import Util from '../common/util'
import ServiceURL from '../common/service'
import BookItem from './book_item'
import Header from '../common/header'

export default class book_detail extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data:null,
	  };
	}
	render(){
			return(
			<View style = {{width:Dimensions.get('window').width,height:Dimensions.get('window').height,backgroundColor:'white'}}>
				{
					this.state.data?
						<View style={{width:Util.size.width,height:Util.size.height}}>
							<Header
								navigator = {this.props.navigator}
								initObj = {{
									backName:'图书',
									title:this.state.data.title,
								}}/>
							<ScrollView style = {{width:Util.size.width,height:Util.size.height,backgroundColor:'white'}}>
							<BookItem row = {this.state.data}/>
							<View>
								{
									this.state.data.summary?
									<Text style = {styles.title}>图书简介</Text>:null
								}
								<Text style = {styles.text}>{this.state.data.summary}</Text> 
							</View>
							<View>
								{
									this.state.data.author_intro?
									<Text style = {styles.title}>作者简介</Text>:null
								}
								<Text style = {styles.text}>{this.state.data.author_intro}</Text>
							</View>
							<View style = {{height:0}}/>
							</ScrollView>
						</View>
						:Util.loading
				}
			</View>
		);
	}
	componentDidMount(){

		var id = this.props.id;
		var that = this;
		var url = ServiceURL.book_search_id + '/' + id;
		Util.get(url,function(data){
			
			that.setState({
				data:data
			});
		},function(err){
			alert(err);
		});
	}
}

var styles = StyleSheet.create({
	m10:{
		flex:1,
		backgroundColor:'white',
	},
	
	title:{
		fontSize:16,
		marginLeft:10,
		marginTop:10,
		marginBottom:10,
	},
	text:{
		marginLeft:10,
		marginRight:10,
		color:'#000D22',
	}
});




/*
<ScrollView style = {styles.m10}>
				{
					this.state.data?
						<View>
							<Header
								navigator = {this.props.navigator}
								initObj = {{
									backName:'图书',
									title:this.state.data.title,
								}}/>
							<BookItem row = {this.state.data}/>
							<View>
								<Text style = {styles.title}>图书简介</Text>
								<Text style = {styles.text}>{this.state.data.summary}</Text> 
							</View>
							<View>
								<Text style = {styles.title}>作者简介</Text>
								<Text style = {styles.text}>{this.state.data.author_intro}</Text>
							</View>
							<View style = {{height:50}}/>
						</View>
						:Util.loading
				}
			</ScrollView>
*/














