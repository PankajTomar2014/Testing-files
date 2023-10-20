import React, { useEffect, useRef, useState } from 'react';

import {
	ActivityIndicator,	
	Dimensions,
	FlatList,
	Image,
	Modal as SliderModal,
	Platform,
	SafeAreaView,
	ScrollView,	
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import { MyStatusBar } from '../../templates/StatusBar';

import { BLUE_MEDIUM,GREY_BRIGHT,BLUE_LIGHT, GREY_LIGHT, GREY_MEDIUM } from '@colors';
import CustomDrawer from '@components/CustomDrawer';
import Toast from "react-native-easy-toast";
import SQLite from 'react-native-sqlite-storage';
import YoutubePlayer from "react-native-youtube-iframe";
import { URL_YOUTUBE_PLAYLIST_ITEM } from '../../../env/env';
import NetworkError from '../../templates/NetworkError';
import NextButton from '../../templates/NextButton';
import Header from '../../templates/Player/Header';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { moderateScale, verticalScale } from '../../helpers';
import Modal from 'react-native-modalbox';
import AlbumList from '../../templates/Player/AlbumList';
import styles, { textStyle, toastStyle } from './styles';

var dataBase = null;

const divineDb = {
    API_KEY : "Use_your_own_api_key",
    DATABASE_NAME  : 'youtubeVidoes.db',
    DIVINE_LIST : ['News Divine','Kids Divine'],
    TABLE_LIST : ["VideoList1","VideoList2"],
    PLAY_LIST : ["PLyUXlksYcqr__p-T160cXXa2hPUFy_jK-","PLyUXlksYcqr9S5M9owVlVrXDemVjMix50"],
    LIKED_VIDEO_TABLE_NAME :"LIKED_VIDEO"
}


export default  (props)=>{
	const { color_scheme, } = props;	
	const isConnected = true	
	const backgroundColor = color_scheme ? '#1b1b1b' : '#fdfdfd';
	const darkaccent = color_scheme ? '#fdfdfd' : '#B0B0B0';



	const [tableCreated,setTableCreated] = useState(false);
	const [videoList,setVideoList] = useState([]);
	const toast = useRef(null);	
	const [playing, setPlaying] = useState(false);
	const [isLoading, setLoading] = useState(false);

	const [isVideoModalVisible,setIsVideoModalVisible]= useState(false);
	const [videoInModal,setVideoInModal] = useState(null);
	const [isVideoReady,setIsVideoReady] = useState(false);
	const [isLiked,setLiked] = useState(false);
	const [likedVideo,setLikedVideo] = useState([]);

	const [isLikedVideoModalVisible, setLikedVideoModalVisible] = useState(false);

	const likeVideoModal = useRef(null);

	useEffect(()=>{
		createDataBaseIfNotExist();
		return ()=> {
			try {
				dataBase?.close();
			} catch (error) {
				console.log("Close error-----",error);
				toast.current.show(error.message, 2000);
			}
		}			
	},[]);

	const createDataBaseIfNotExist = ()=>{
		setLoading(true);
		dataBase = SQLite.openDatabase({
		  name: divineDb.DATABASE_NAME,
		  location: 'default',
		},(database)=>{	
		  console.log("database Created success =>",database.dbname);     
		  checkLikedVideoExistInDB(divineDb.LIKED_VIDEO_TABLE_NAME,divineDb.DIVINE_LIST[0])

		  checkVideoExistInDB(divineDb.TABLE_LIST[0],divineDb.DIVINE_LIST[0],divineDb.PLAY_LIST[0]);
		 setTimeout(()=>{
			checkVideoExistInDB(divineDb.TABLE_LIST[1],divineDb.DIVINE_LIST[1],divineDb.PLAY_LIST[1]);
		 },500);
		 setLoading(true);
		},(error)=>{	
			console.log("database Created failed =>",error);     
			toast.current.show("Database Creation failed", 2000);
			setLoading(true);
		  });
	  };

	  const checkVideoExistInDB = (tableName,divineName,playlistID) => {
		console.log("checkVideoExistInDB-------",tableName,divineName);
		setLoading(true);
		dataBase.transaction((tx) => {
		  tx.executeSql(
			`SELECT * FROM ${tableName}`,
			[],
			(_, results) => {
			  const rows = results.rows;
			  var videosList = []
	
			
			  if(rows.length > 0 && rows.length !== undefined){
				for (let i = 0; i < rows.length; i++) {				
					videosList.push(rows.item(i));
				};				
				videoList.push({videosList,divineName});
			  }else {
				console.log("table not found--->",tableName,divineName);
				onCreateTableIfNotExist(tableName,divineName,playlistID);
			  };
			  setLoading(false);
			},
			(error) => {
			  setLoading(false);
			  console.log('Error retrieving exiting data:', error);
			  toast.current.show(error.message, 2000);
			  if(error.message.includes("no such table")){
				onCreateTableIfNotExist(tableName,divineName,playlistID);
			  }
			}
		  );
		});
		setLoading(false);
	  };

	  const checkLikedVideoExistInDB = (tableName,divineName)=>{		
			console.log("checkLikedVideoExistInDB-------",tableName,divineName);
			setLoading(true);
			dataBase.transaction((tx) => {
			  tx.executeSql(
				`SELECT * FROM ${tableName}`,
				[],
				(_, results) => {
				  const rows = results.rows;
				  var videosList = []
		
				
				  if(rows.length > 0 && rows.length !== undefined){
					for (let i = 0; i < rows.length; i++) {				
						likedVideo.push(rows.item(i));
					};				
					// likedVideo.push({videosList});
				  }else {
					console.log("liked table not found--->",tableName,divineName);
					onCreateLikedVideoIfNotExist(tableName);
				  };
				  setLoading(false);
				},
				(error) => {
				  setLoading(false);
				  console.log('Error retrieving exiting data:', error);
				//   toast.current.show(error.message, 2000);
				  if(error.message.includes("no such table")){
					onCreateLikedVideoIfNotExist(tableName);
				  }
				}
			  );
			});
			setLoading(false);
		  };

		  const onCreateLikedVideoIfNotExist = (tableName)=>{			
				console.log("onCreateLikedVideoIfNotExist--called---->");    
					try{
					  console.log("try-Called----->");
						dataBase.transaction((tx) => {
						  console.log("transaction-Called-if-not exist---->");				  
							tx.executeSql(
							  `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, videoName TEXT, videoId TEXT, thumbNail TEXT)`,
							  [],
							 async (tx, result) => {   
							//    toast.current.show('Table created if-not exist', 2000); 
							   console.log("Table created if-not exist");
							//    insertDataInNotReCreatedTable(videos[i],tableName,divineName);
							   
							  },
							  (error) => {
								console.log("error-Called----->");
								console.log('Error creating table_1:', error.message);
								toast.current.show('Error creating table:',error.message, 2000);
							  }
							);					
						  });
						  
					}catch(error){
					  console.log("catch-Called----->");
						console.log('catch Error creating table:', error.message);
						toast.current.show('catch Error creating table:',error.message, 2000);
					}
			  };


	  const onCreateTableIfNotExist = (tableName,divineName,playlistID)=>{    
		console.log("onCreateTableIfNotExist--called---->");    
			try{
			  console.log("try-Called----->");
				dataBase.transaction((tx) => {
				  console.log("transaction-Called-if-not exist---->");				  
					tx.executeSql(
					  `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, videoName TEXT, videoId TEXT, thumbNail TEXT)`,
					  [],
					 async (tx, result) => {   
					   toast.current.show('Table created if-not exist', 2000); 
					   console.log("Table created if-not exist");
					   const videos = await videoFetchAPI(URL_YOUTUBE_PLAYLIST_ITEM, playlistID);
					   console.log("API-Called--if-not exist--->",videos);
					   if(videos.error){
						toast.current.show(videos.error.message, 5000);
					   } else if (videos != undefined){
						  for(let i=0; i< videos.length ; i++){
							insertDataInNotReCreatedTable(videos[i],tableName,divineName);							
						  }
					   }
					  },
					  (error) => {
						console.log("error-Called----->");
						console.log('Error creating table_1:', error.message);
						toast.current.show('Error creating table:',error.message, 2000);
					  }
					);					
				  });
				  
			}catch(error){
			  console.log("catch-Called----->");
				console.log('catch Error creating table:', error.message);
				toast.current.show('catch Error creating table:',error.message, 2000);
			}
	  };

const insertDataInNotReCreatedTable = (vidoessss,tableName,divineName) => {
	console.log("inserted into ReCreated Table----",tableName,vidoessss);
	dataBase.transaction((tx) => {
	  tx.executeSql(
		`INSERT INTO ${tableName} (videoName, videoId, thumbNail) VALUES (?, ?, ?)`,
		[vidoessss.title, vidoessss.resourceId.videoId,vidoessss.thumbnails.maxres.url],
		(_, success) => {
		  console.log("dddd----",vidoessss.title,vidoessss.resourceId.videoId,vidoessss.thumbnails.maxres.url);
		  toast.current.show('Data inserted successfully', 1000);
		  console.log('Data inserted successfully',success);
		  reteriveDataFromReCreatedTable(tableName,divineName);
		},
		(error) => {
		  console.log('Error inserting data:', error);
		  toast.current.show('Error insertion'+ error.message, 1000);
		}
	  );
	});
  };


  const reteriveDataFromReCreatedTable = async (tableName,divineName) => {
	console.log("Retrived from ReCreated Table---",tableName);
	dataBase.transaction((tx) => {
		tx.executeSql(
		  `SELECT * FROM ${tableName}`,
		  [],
		  (_, results) => {
			const rows = results.rows;
			var videosList = []
  
			console.log("Retrieved data ReCreated Table-------",rows);
			if(rows.length > 0 && rows.length !== undefined){
			  for (let i = 0; i < rows.length; i++) {
				videosList.push(rows.item(i));
			  };					 
			  videoList.push({divineName,videosList});			
			
			}else {
			//   onCreateTable();
			console.log('Error re- retrieving data:', error);
			}
		  },              
		  (error) => {
			console.log('Error re- retrieving failed:', error);
			toast.current.show(error.message, 2000);
		  }
		);
	  });
  };

	
			
	const videoFetchAPI = async (urlBase, playlistID) => {
			try{
				setLoading(true);
				var finalURL = `${urlBase}${playlistID}&key=${divineDb.API_KEY}`;
				console.log("finalURL---------",finalURL)
				return await fetch(finalURL)
						.then((response) => response.json())
						.then((responseJson) => {
						console.log("videoFetchAPI---------",responseJson);					
						const youtube = responseJson.items.map((obj)=> obj.snippet);	
						console.log("youtube---------",youtube)
						setLoading(false);
					return youtube
				})
				.catch((error) => {
					setLoading(false);
					toast.current.show(error.message, 2000);
				})
			}catch(error){
				setLoading(false);
				toast.current.show(error.message, 2000);
			}
		};



	const createTableLikedVideo = (likedVideo)=>{    
			console.log("createTableLikedVideo--called---->",likedVideo);    
				try{
				  console.log("try-Called----->");
					dataBase.transaction((tx) => {
					  console.log("transaction-Called-if-not exist---->");				  
						tx.executeSql(
						  `CREATE TABLE IF NOT EXISTS ${divineDb.LIKED_VIDEO_TABLE_NAME} (id INTEGER PRIMARY KEY AUTOINCREMENT, videoName TEXT, videoId TEXT, thumbNail TEXT)`,
						  [],
						 async (tx, result) => {   
						   toast.current.show('Table created LikedVideo', 2000); 
						   console.log("Table created LikedVideo");
						   insertDataInLikedVideoTable(divineDb.LIKED_VIDEO_TABLE_NAME,likedVideo);					
						  },
						  (error) => {
							console.log("error-Called----->");
							console.log('Error creating table_1:', error.message);
							toast.current.show('Error creating table:',error.message, 2000);
						  }
						);					
					  });
					  
				}catch(error){
				  console.log("catch-Called----->");
					console.log('catch Error creating table:', error?.message);
					toast?.current?.show('catch Error creating table:',error?.message, 2000);
				}
		  };

	const insertDataInLikedVideoTable = (tableName,likedVideo) => {
		console.log("insertDataInLikedVideoTable----",tableName,likedVideo);
		dataBase.transaction((tx) => {
		tx.executeSql(
			`INSERT INTO ${tableName} (videoName, videoId, thumbNail) VALUES (?, ?, ?)`,
			[likedVideo.videoName, likedVideo.videoId,likedVideo.thumbNail],
			(_, success) => {
			console.log("insertLikedVideo----",likedVideo);
			toast.current.show('Data inserted successfully', 1000);
			console.log('Data inserted successfully',success);
			reteriveDataFromLikedVideoTable(tableName);
			},
			(error) => {
			console.log('Error inserting data:', error);
			toast.current.show('Error insertion'+ error.message, 1000);
			}
		);
		});
	};

	const reteriveDataFromLikedVideoTable = (tableName)=>{	
		console.log("reteriveDataFromLikedVideoTable",tableName);
		dataBase.transaction((tx) => {
			tx.executeSql(
			  `SELECT * FROM ${tableName}`,
			  [],
			  (_, results) => {
				const rows = results.rows;
				var videosList = []
	  
				console.log("reteriveDataFromLikedVideoTable-------",rows);
				if(rows.length > 0 && rows.length !== undefined){
				  for (let i = 0; i < rows.length; i++) {
					likedVideo.push(rows.item(i));
				  };					 
				//   likedVideo.push(videosList);		
				const unique = [...new Map(likedVideo.map((item) => [item.videoId, item])).values()];
				setLikedVideo(unique);	
				
				}else {
				//   onCreateTable();
				console.log('Error re- retrieving data:', error);
				}
			  },              
			  (error) => {
				console.log('Error re- retrieving failed:', error);
				toast.current.show(error.message, 2000);
			  }
			);
		  });
	  };


	

	
	
	  const removeLikedVideo = (item,index) => {
		dataBase.transaction(tx => {
			tx.executeSql(`DELETE FROM ${divineDb.LIKED_VIDEO_TABLE_NAME} WHERE videoId = ?`,[item?.videoId],
			(resultSet) => {
				if (likedVideo.length == 1) {
					setLikedVideo([]);
					setLikedVideoModalVisible(false)
				  } else {
					likedVideo.splice(index, 1); 
					setLikedVideo([...likedVideo]);
				  }
			  },
			  (error) => {
				// Error callback
				console.error('Error removing item:', JSON.stringify(error));
				toast.current.show(JSON.message(error), 2000);
			  }
			);
		  });
	  };


const onRefresh = () => {};


const renderDevineList = ({item,index})=> {
	const divineType = item.divineName;
	return(
		<View>
			<Text allowFontScaling={false}
				style={textStyle}>{divineType}</Text>

				 
			<FlatList
					data={item.videosList}  
					keyExtractor={(item) => item.videoId}
					horizontal
					showsHorizontalScrollIndicator={false}	
					contentContainerStyle={{marginTop:10,paddingHorizontal:10}}									
					renderItem={({item,index})=> renderVideoList(item,index,divineType)}
				/>
		</View>		
	)
};



const renderVideoList = (item,index,divineName) => {
    return (
      <VideoView
		thumbNail={item.thumbNail}
		videoName={item.videoName}
		videoId={item.videoId}
		onPress={()=>{		
			console.log("Ddddddd------>",{...item,divineName});		
			setIsVideoModalVisible(true);
			setIsVideoReady(false);
			setVideoInModal({...item,divineName,index});	
			setLiked(false);
		}}
	  />
    )
  };

  const renderLikedVideoList = ({ item, index }) => {
    return (
		<VideoView
			thumbNail={item.thumbNail}
			videoName={item.videoName}
			videoId={item.videoId}
			onPress={()=>{								
				setIsVideoModalVisible(true);
				setIsVideoReady(false);
				setVideoInModal({...item,index});
				setLiked(true);
			}}
  		/>
    )
  };


  const renderLikedList =({ item, index })=>{
	
	return(
		<View style={{
			flexDirection:"row",			
			marginHorizontal:10,			
			marginVertical:5,
			justifyContent:"space-between"
		}}>		
			<Text 
			style={{
				width:"90%",
				color: color_scheme ? 'rgba(255, 255, 255, 0.84)' : '#6d6d6d',
				fontSize: 16,
				fontFamily: 'Raleway-Bold',
			}}>{item.videoName}</Text>		

		<TouchableOpacity 
		style={{
			height:40,
			width:40,
			justifyContent:"center",
			alignItems:"center",
		}}
		activeOpacity={0.9}
		onPress={()=> removeLikedVideo(item,index)}
		>			
			<MaterialIcons
				size={24}
				color={color_scheme ? 'rgba(255, 255, 255, 0.84)' : '#6d6d6d'}
				name={true ? 'favorite' : 'favorite-border'}
				/>
		</TouchableOpacity>
	</View>
	)
  }

	return(
		<SafeAreaView style={{flex:1,backgroundColor: backgroundColor}}>
			<MyStatusBar backgroundColor={BLUE_MEDIUM} barStyle='light-content' />
				<Header
					handleBack={() => props.navigation.goBack()}
					goBack={true}
					title={'STUDIO DIVINE'}
					bgcolor={BLUE_MEDIUM}
					color={GREY_LIGHT}
					isConnected={true}
					onSearchPress={()=>props.navigation.navigate('Search', { type: 'global' })}
					showSearch={true}
					// showMenu={this.showMenu}					
					showBackArrow={true}
					{...props}
				/>
				{/* {console.log("likedVideo------------",likedVideo)}
				{console.log("videoList-------->",JSON.stringify(videoList))}
				{console.log("modalData-------->",videoInModal)} */}
		
		{console.log("likedVideo------------",likedVideo)}
		{console.log("videoList-------->",JSON.stringify(videoList))}
		

			

				{isConnected ? (
				<ScrollView>
								{likedVideo.length > 0 &&
								<>

								<TouchableOpacity
									onPress={()=>setLikedVideoModalVisible(true)}
									style={{
										paddingLeft:18,											
										height: 35,
										width:"45%",
										flexDirection: 'row',
										alignItems:"center"  ,
										alignContent:"center"
									}}>									
										<Text
											allowFontScaling={false}
											style={{
												color: BLUE_LIGHT,
												fontFamily: 'Raleway-Bold',
												fontSize: 20,											
												paddingRight: 8,
											}}>
											{'Liked Videos'}
										</Text>									
										<Image
											style={{
												width: 24,
												height: 24,
												tintColor: BLUE_LIGHT,												
												marginTop:5,
											}}
											source={require('../../assets/images/play.png')}
											/>								
								</TouchableOpacity>
								<View style={{ }}>		
									<FlatList
										data={likedVideo}
										horizontal
										keyExtractor={(item) => item.videoId}
										contentContainerStyle={{marginTop:10,paddingHorizontal:10}}	
										ListEmptyComponent={likedVideo.length > 0 && likedVideo!=null ? null : <Text>{'No video found!'}</Text> }														
										renderItem={renderLikedVideoList}
										/>						
								</View>
										</>
								}
			{/* {props.transactions ?(  */}
				{isConnected ? (
					<View style={{}}>				
					{isLoading ?
							<ActivityIndicator
								size='small'
								color={darkaccent}
								style={{ alignItems: 'center', justifyContent: 'center' }}
							/> :	
					<FlatList
						data={videoList}
						showsHorizontalScrollIndicator={false}	
						// keyExtractor={(item) => item.videoId}			
						ListEmptyComponent={isLoading ? null : <EmptyMessage msg={'No video found!'}/>}				
						renderItem={renderDevineList}
						/>  }
				</View>
				) : (
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						{isConnected && (
							<ActivityIndicator
								size='small'
								color={darkaccent}
								style={{ alignItems: 'center', justifyContent: 'center' }}
							/>
						)}
						{!isConnected && (
							<Text
								allowFontScaling={false}
								numberOfLines={1}
								ellipsizeMode={'tail'}
								style={{
									color: darkaccent,
									fontSize: 13,
									textAlign: 'center',
									fontFamily: 'Raleway-Light',
								}}>
								{'Please switch on your internet connection to continue'}
							</Text>
						)}
						{!isConnected && (
							<NextButton
								fontStyle={{ fontSize: 15, fontFamily: 'Raleway-Bold' }}
								style={{
									marginTop: 16,
									borderRadius: 8,
									width: 200,
									fontSize: 12,
									fontWeight: 'bold',
								}}
								color={BLUE_MEDIUM}
								text='RETRY'
								validity={true}
								onPress={onRefresh}
							/>
						)}
					</View>
				)}
				{/* {Platform.OS === 'ios' ? <CustomDrawer /> : null} */}
			</ScrollView>
				) : (
					<NetworkError
						bgcolor={BLUE_MEDIUM}
						onRefresh={()=> onRefresh()}
						colour={darkaccent}
					/>
				)}
				<Toast
				ref={toast}
				style={toastStyle.style}
				position={toastStyle.position}          
				textStyle={toastStyle.textStyle}
        />

						<Modal
								useNativeDriver
								backdropOpacity={0}
								backButtonClose
								swipeToClose={false}
								backdropPressToClose
								style={{
									marginTop:50,
									flex:1
								}}
								position={'bottom'}
								isOpen={isLikedVideoModalVisible}
								onClosed={()=>setLikedVideoModalVisible(false)}								
								>
								<View style={{flex:1,backgroundColor:"white"}}>
									<TouchableOpacity 
									style={{
										alignSelf:"flex-end",
										marginRight:10,
										marginTop:10
									}} onPress={() => {										
											setLikedVideoModalVisible(false)
											}
											}>
											<MaterialIcons
												name={'close'}
												color={GREY_BRIGHT}
												size={moderateScale(30)}
												style={{ }}
											/>
									</TouchableOpacity>
								
									<FlatList
										data={likedVideo}										
										contentContainerStyle={{paddingHorizontal:10}}	
										ListHeaderComponent={()=> {
											const lastItem = likedVideo[likedVideo?.length - 1];
											console.log('lastItem-------',lastItem?.thumbNail);

											return(
												<View style={{flexDirection:"row",paddingLeft:10,}}>
													<Image
													source={{ uri:lastItem?.thumbNail}}
													style={{
														height:150,
														width:150,
														borderRadius:10,
														backgroundColor:"gray"
													}}
													/>

													<View>
														<Text 
														numberOfLines={8}
														style={{	
																paddingLeft:10,
																paddingRight:10,
																paddingBottom:10,
																marginRight:150,
																// backgroundColor:"red",														
																color: color_scheme ? 'rgba(255, 255, 255, 0.84)' : '#6d6d6d',
																fontSize: 16,
																fontFamily: 'Raleway-Bold',
																}}>{lastItem?.videoName}</Text>
														</View>
												</View>
											)
										}}	
										ListEmptyComponent={likedVideo.length > 0 && likedVideo!=null ? null : <Text>{'No video found!'}</Text> }														
										renderItem={renderLikedList}
										/>


								</View>
						</Modal>

			
			{isVideoModalVisible ? (
				  <SliderModal animationType={'slide'} visible={true} transparent={true}>
					<View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: 'rgba(52, 52, 52, 0.8)', }}>
						
						
						{isVideoReady &&
						<View 
						style={{
							flexDirection:"row",
							width:Dimensions.get('screen').width * 0.95,
							justifyContent:"space-between",					  
							height:50,				   
						}}>
							<TouchableOpacity style={styles.closeButton} 
							onPress={() => {
								setIsVideoReady(true);
								setIsVideoModalVisible(false);
								setVideoInModal(null);			
							}
							}>
							<MaterialIcons
								name={'close'}
								color={GREY_LIGHT}
								size={moderateScale(30)}
								style={styles.closeIcon}
							/>
							</TouchableOpacity>
				
							<TouchableOpacity 
							style={styles.closeButton} onPress={() => {              
							setLiked(!isLiked);
							
							const data = {
								videoName:videoInModal?.videoName,
								thumbNail:videoInModal?.thumbNail,				
								videoId:videoInModal?.videoId,
								divineName:videoInModal?.divineName
							};

							const isItemExistInArrat = likedVideo.filter(i=>i.videoId == videoInModal?.videoId);
							console.log("likedVideo-----",isItemExistInArrat);
							if(isItemExistInArrat.length == 0 ){								
								createTableLikedVideo(data)	;								
							}else{
								removeLikedVideo(videoInModal,videoInModal?.index)
							}
							}
							}>
							<MaterialIcons
							name={likedVideo.filter(i=>i.videoId == videoInModal?.videoId).length !== 0 ? 'favorite' : 'favorite-border'}
								color={GREY_LIGHT}
								size={moderateScale(28)}
								style={styles.closeIcon}
							/>
							</TouchableOpacity>
				
				
						</View>}
				
						<YoutubePlayer
							width={Dimensions.get('screen').width * 0.95}
							height={Dimensions.get('screen').height / 2.5}
							play={false}
							videoId={videoInModal?.videoId}
							onReady={() => setIsVideoReady(true)}
							modestbranding={false}
							onChangeState={() => null}
							forceAndroidAutoplay={true}
						/>
				
						{!isVideoReady &&
						<View style={styles.loader}>
							<ActivityIndicator size={"large"} color={GREY_BRIGHT} />
						</View>
						}
					</View>
				</SliderModal>
		) : null}	
		</SafeAreaView>
	)
};



const EmptyMessage = (props)=>{
    const { msg } = props;
    return(
        <Text style={styles.msgStyle}>{msg}</Text>
    )
};

export const VideoView = (props)=>{
	const { 
			onPress, 
			thumbNail,
			videoId, 
			videoName,
		} = props;
	return(
	<TouchableOpacity 
		onPress={onPress}
		activeOpacity={1}
		style={{
			width: 170,			
			marginLeft:10,
			borderRadius: 8
		}}>

			<Image
				source={{uri:thumbNail}}
				style={{height:95,width:160}}
				resizeMode={'cover'}			
			/>
        		{/* <YoutubePlayer
					height={95}					
					play={false}
					videoId={item.videoId}      
					onReady={() => setLoading(false)}					
					modestbranding={false}
					onChangeState={onStateChange}
					forceAndroidAutoplay={true}
				/> */}
				 <Text 
					numberOfLines={2}
					style={{
						color: GREY_MEDIUM,
						fontSize: 15,						
						fontFamily: "Raleway-Light",						
					}}>{videoName}</Text>

      </TouchableOpacity>)
}
