import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'; 
import Dialog, {
  DialogTitle,
  DialogContent,
  ScaleAnimation,

} from 'react-native-popup-dialog';

const { 
  height:SCREEN_HIEGHT,
  width : SCREEN_WIDTH,
} =  Dimensions.get('screen');
 
export const ConfirmAlert = (props) => {
    const {visible,onClose,userName,onRemoveBtn } = props;
 






 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>      
 
        <Dialog
          onTouchOutside={onClose}
          onHardwareBackPress={onClose}
          width={0.9}         
          visible={visible}
          dialogAnimation={new ScaleAnimation()}             
          dialogTitle={
            <DialogTitle
              hasTitleBar={false}
            />
          }         
          >
            <TouchableOpacity
              onPress={onClose}
              style={{
                width: 45,
                height: 45,
                justifyContent:"center",
                alignItems:'center',                
                alignSelf:"flex-end",
                position:"absolute",
                top:5,
                right:5,
               
              }}>
              <Image
                resizeMode={'contain'}
                style={{
                  height: 20,
                  width: 20,
                  
                }}
                source={{uri:"https://cdn4.iconfinder.com/data/icons/social-messaging-ui-coloricon-1/21/39-512.png"}}
              />
            </TouchableOpacity>
          <DialogContent>
          
          
              <Text style={{
                textAlign:'center',
                marginHorizontal:5,
                fontSize:20,
                fontWeight:"600",
              }}>
                Are you sure, you want to remove {'\n'}this friend{'  '}
                      <Text 
                        style={{                         
                          color:"#00C3FF",
                          textDecorationLine:"underline",
                          fontWeight:"bold"
                        }}>
                         {userName}{' '}
                        
                        </Text>
                        <Text 
                          style={{                         
                            color:"#00C3FF",                           
                            fontWeight:"bold"
                          }}>
                         ?
                        </Text>
                        
              </Text>
              
              <DeleteBtn
                  title={'Remove'}
                  onPress={onRemoveBtn}
              />
          </DialogContent>
        </Dialog>
 

      </View>
    </SafeAreaView>
  );
};

export const DeleteBtn = (props)=>{
  const { title,onPress } = props;
  return(
            <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
              style={{             
                borderRadius:5,
                marginVertical:20,
                justifyContent:"center",
                alignItems:'center',
                backgroundColor:"#E81C3E",
                alignSelf:"center",               
               
              }}>
              <Text 
              style={{
                fontSize:15,
                fontWeight:"900",
                color:'white',
                paddingHorizontal:20,
                paddingVertical:15,
                
              }}>{title}</Text>
            </TouchableOpacity>
  )
}

export const DeleteIconBtn = (props)=>{
  const { } = props;
  return(
            <TouchableOpacity
              onPress={() => setScaleAnimationDialog(false)}
              style={{
                width: 40,
                height: 40,
                justifyContent:"center",
                alignItems:'center',
                // backgroundColor:"green",
                alignSelf:"center",
                position:"absolute",
                top:-60,
                // right:5,
               
              }}>
              <Image
              resizeMode={'contain'}
                style={{
                  height: 50,
                  width: 50,                 
                }}
                source={{uri:"https://media.baamboozle.com/uploads/images/87532/1598450391_18687"}}
              />
            </TouchableOpacity>
  )
};



 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    padding: 16,
  },
  buttonStyle: {
    minWidth: '100%',
    padding: 10,
    backgroundColor: '#f5821f',
    margin: 15,
  },
  buttonTextStyle: {
    color: 'white',
    textAlign: 'center',
  },
  titleStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
  },
});