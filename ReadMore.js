
import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';

export default App = ()=>  {

  const text = "Lorem Ipsum is simply dummy text of the printing Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ReadMore text={text+text} />
    </SafeAreaView>
  );
};

export const ReadMore= (props)=> {
  const { text } = props;

  const [isShowAllText, setIsShowAllText] = useState(true);
  const handleReadMore = () =>setIsShowAllText(preState =>!preState);
  return (
    
      <View style={{width:'90%',alignSelf:'center'}}>
            <Text>{isShowAllText ? text.substr(0,300) : text }</Text>
            <Text
                style={{
                  width:90,
                  fontWeight:"400",
                  fontSize:15,                 
                  paddingVertical:5,
                  color:"#1973E8",                  
                }}
                onPress={()=>handleReadMore()}
              >{isShowAllText ? 'Read More': 'Read Less'}</Text>
          </View>   
  );
};
