import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { CustomeButton, InputField, toastStyle } from '../../Components/MyComponents';
import Toast from 'react-native-easy-toast';

var dataBase = null;

export default class SQLiteDB extends Component {
  constructor(props) {
    super(props);
    this.state = {
        tableName:"",
        tableCreated:false,
        userData: [],
    };
  };

 

  componentDidMount(){
    this.initTable();
  };

  componentWillUnmount(){
    dataBase.close();
  }

  initTable = ( )=>{
    dataBase = SQLite.openDatabase({
      name: 'pankajDataBase.db',
      location: 'default',
    });
    
    this.reteriveDataFromTable();
    
  };

  onCreateTable = ( )=>{
    if(this.state.tableName==""){
        alert("Please enter table name")
    }else{
        try{
            dataBase.transaction((tx) => {
                tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)',
                  [],
                  (tx, result) => {          
                    this.toast.show(this.state.tableName +" "+ 'Table created successfully', 2000);
                    this.setState({tableCreated:true})
                    console.log("table created---",tx, result);
                  },
                  (error) => {
                    console.log('Error creating table:', error.message);
                    this.toast.show('Error creating table:',error.message, 2000);
                  }
                );
              });
        }catch(error){
            console.log('catch Error creating table:', error.message);
            this.toast.show('catch Error creating table:',error.message, 2000);
        }

    }
  };


    insertDataInTable = () => {
        console.log("called----");
        dataBase.transaction((tx) => {
          tx.executeSql(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [this.state.tableName, this.state.tableName+'@example.com'],
            (_, results) => {
              // Success callback
              this.toast.show('Data inserted successfully', 2000);
              console.log('Data inserted successfully',results);
            },
            (_, error) => {
              // Error callback
              console.log('Error inserting data:', error);
              this.toast.show('Error inserting data:', error, 2000);
            }
          );
        });
      };

    reteriveDataFromTable = async () => {
        dataBase.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM users',
              [],
              (_, results) => {
                const rows = results.rows;
                for (let i = 0; i < rows.length; i++) {
                    console.log('User:', rows.item(i));
                    this.state.userData.push(rows.item(i))
                  }
                console.log('Retrieved data:', rows);
                // this.setState({userData:rows.item(i)});
                this.toast.show('Retrieved data:', 2000);
              },
              (_, error) => {
                console.log('Error retrieving data:1', _);
                console.log('Error retrieving data:2',error);
                this.toast.show(error, 2000);
              }
            );
          });
      };


      handleDeleteData = () => {
        dataBase.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM users WHERE id = ?',
            [1],
            (_, { rowsAffected }) => {
              if (rowsAffected > 0) {
                console.log('Data deleted successfully');
              } else {
                console.log('No data deleted');
              }
            },
            (_, error) => {
              console.log('Error deleting data:', error);
            }
          );
        });
      };

  render() {
    return (
      <View style={{flex:1}}>
            <Text style={{
                textAlign:"center",
                fontSize:30,
                fontWeight:"bold",
                }}>{this.state.userData?.length > 0 ? this.state.userData?.length : "No data found!"}</Text>
            
        {!this.state.tableCreated &&
             <>
                <InputField
                placeholder={'Table Name'}
                onChangeText={(text)=>this.setState({tableName:text })}
                />
           
                <CustomeButton
                onPress={()=>this.onCreateTable()}
                title={'Create Table'}
                />
            </> 
        }

        <CustomeButton
            onPress={()=>this.insertDataInTable()}
            title={!this.state.tableCreated ? "Insert" :'Insert data in '+this.state.tableName+" table "}
       />

        <CustomeButton
            onPress={()=>this.reteriveDataFromTable()}
            title={!this.state.tableCreated ? "Reterive" : 'Reterive data from '+this.state.tableName + "table"}
       />

        <CustomeButton
            onPress={()=>this.handleDeleteData()}
            title={"Delete data"}
       />

      <CustomeButton
            onPress={()=>this.props.navigation.navigate("VideoScreen")}            
            title={'VideoScreen'}
            style={{marginTop:40}}
       />

      <Toast
            ref={(toast) => (this.toast = toast)}
            style={toastStyle.style}
            position={toastStyle.position}          
            textStyle={toastStyle.textStyle}
        />
        
      </View>
    );
  }
}
