import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, View, Alert, FlatList, Text, Image, SafeAreaView } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { CustomeButton, EmptyMessage, SeperaterLine, toastStyle } from "../../Components/MyComponents";
import SQLite from 'react-native-sqlite-storage';
import Toast from "react-native-easy-toast";



const API_KEY = "Use_your_own_api_key";
const DATABASE_NAME  = 'youtubeVidoes.db';
const TABLE_NAME = "VideoList";





var dataBase = null;
export default function VideoSceen() {
  const toast = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [videoList,setVideoList] = useState([]);

  useEffect(()=>{
    createDataBaseIfNotExist();
  },[]);

 const createDataBaseIfNotExist = ()=>{
    dataBase = SQLite.openDatabase({
      name: DATABASE_NAME,
      location: 'default',
    },(database)=>{

      console.log("database Created success =>",database.dbname);     
      checkVideoExistInDB();
    });
  };


  const checkVideoExistInDB = () => {
    dataBase.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM ${TABLE_NAME}`,
        [],
        (_, results) => {
          const rows = results.rows;
          var newVideosLIst = []

          console.log("checkVideoExistInDB-------",rows);
          if(rows.length > 0 && rows.length !== undefined){
            for (let i = 0; i < rows.length; i++) {
              console.log(`Video-${i}]--->`, rows.item(i));
              newVideosLIst.push(rows.item(i));
            };
            
            setVideoList(newVideosLIst);
          }else {
            onCreateTable();
          }
        },
        (error) => {
          console.log('Error retrieving exiting data:', error);
          toast.current.show(error.message, 2000);
          if(error.message.includes("no such table")){
            onCreateTable();
          }
        }
      );
    });
  }

 const fetchVideo = async()=>{
    const channelId = "UC0r5GbjNx6U5nO2XB-p19xA";
    const pageToken = "CGAQAA";
    const maxResults = 12;
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?order=date&q=&part=snippet&channelId=${channelId}&type=video&pageToken=${pageToken}&maxResults=${maxResults}&key=${API_KEY}`);
    const videos = await response.json();
    console.log("videosList-------",videos);    
    return videos;   
  };



  const onCreateTable = ( )=>{    
    console.log("created called------>");    
        try{
          console.log("try-Called----->");
            dataBase.transaction((tx) => {
              console.log("transaction-Called----->");
                tx.executeSql(
                  `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (id INTEGER PRIMARY KEY AUTOINCREMENT, videoName TEXT, videoId TEXT)`,
                  [],
                 async (tx, result) => {   
                   toast.current.show('Table created successfully', 2000); 
                   const videos = await fetchVideo();
                   console.log("API-Called----->",videos);
                   if(videos.error){
                    toast.current.show(videos.error.message, 5000);
                   } else if (videos.items != undefined){
                      for(let i=0; i< videos.items.length ; i++){
                        insertDataInTable(videos.items[i]);
                        console.log("table created---",videos[i]);
                      }
                   }
                  },
                  (error) => {
                    console.log("error-Called----->");
                    console.log('Error creating table:', error.message);
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


   const insertDataInTable = (vidoessss) => {
        console.log("inserted called----",vidoessss);
        dataBase.transaction((tx) => {
          tx.executeSql(
            `INSERT INTO ${TABLE_NAME} (videoName, videoId) VALUES (?, ?)`,
            [vidoessss.snippet.title, vidoessss.id.videoId],
            (_, results) => {
              // Success callback
              console.log("dddd----",vidoessss.snippet.channelTitle,vidoessss.id.videoId);
              toast.current.show('Data inserted successfully', 1000);
              console.log('Data inserted successfully',results);
              reteriveDataFromTable();
            },
            (error) => {
              // Error callback
              console.log('Error inserting data:', error);
              toast.current.show('Error insertion'+ error.message, 1000);
            }
          );
        });
      };

      const reteriveDataFromTable = async () => {
        console.log("Retrived called----");
        dataBase.transaction((tx) => {
            tx.executeSql(
              `SELECT * FROM ${TABLE_NAME}`,
              [],
              (_, results) => {
                const rows = results.rows;
                var newVideosLIst = []
      
                console.log("Retrieved data-------",rows);
                if(rows.length > 0 && rows.length !== undefined){
                  for (let i = 0; i < rows.length; i++) {
                    console.log(`Video-${i}]--->`, rows.item(i));
                    newVideosLIst.push(rows.item(i));
                  };
                  
                  setVideoList(newVideosLIst);
                }else {
                  onCreateTable();
                }
              },              
              (error) => {
                console.log('Error retrieving data:', error);
                toast.current.show(error.message, 2000);
              }
            );
          });
      };

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);


  const clearDataBase = () => {
    dataBase.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM ${TABLE_NAME} WHERE videoName="TEXT";`,
        [],
        () => {
          console.log('Tables deleted successfully.');
          toast.current.show("Tables deleted successfully.",2000);
        },
        (error) => {
          console.log('Error deleting tables: ', error);
          toast.current.show("Error deleting tables:"+error.message,2000);
        }
      );
  
      tx.executeSql(
        `DELETE FROM ${TABLE_NAME};`,
        [],
        () => {
          console.log('Sequence reset successfully.');
          toast.current.show("Sequence reset successfully.",2000);
        },
        (error) => {
          console.log('Error resetting sequence: ', error);
          toast.current.show("Error resetting sequence : "+error.message, 2000);
        }
      );
    }, (error) => {
      console.log('Transaction error: ', error);
      toast.current.show("Error Database deleted : "+error.message, 2000);
    }, () => {
      console.log('Database deleted successfully.');
      toast.current.show("Database deleted successfully.", 2000);
      setVideoList([]);
      setPlaying(false);
    });
  };

  

  const renderVideoList = ({ item, index }) => {
    return (
      <View>
        

        <YoutubePlayer
          height={230}      
          play={playing}         
          videoId={item.videoId}          
          onChangeState={onStateChange}
        />

      <Text 
        numberOfLines={2}
        style={{
          fontSize:13,
          color:"black",
          fontWeight:"bold",        
          marginLeft:20,
          marginRight:50,
        }}>{item.videoName}</Text>

      </View>
      
    )
  };



  return (
    <SafeAreaView style={{flex:1}}>
      
      <FlatList
        data={videoList}  
        ListHeaderComponent={()=>videoList.length > 0 ? <CustomeButton title={"Clear Database"} onPress={()=> clearDataBase()} />:null}      
        ListEmptyComponent={<EmptyMessage msg={'No video found!'}/>}
        ItemSeparatorComponent={()=><SeperaterLine/>}
        renderItem={renderVideoList}
      />     

      <Toast
            ref={toast}
            style={toastStyle.style}
            position={toastStyle.position}          
            textStyle={toastStyle.textStyle}
        />

    </SafeAreaView>
  );
}