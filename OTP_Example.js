import React, {useState,useRef} from "react";
import {StyleSheet,View,Text,KeyboardAvoidingView,TextInput,ScrollView} from "react-native";

export default function Otp() {  

    let textInput1 = useRef(null)
   let textInput2 = useRef(null)
   let textInput3 = useRef(null)
   let textInput4 = useRef(null)

   const [input,setInput] = useState({
     value1:'',
     value2:'',
     value3:'',
     value4:'',
   })  
   const onChangeText = (name,text) => {
     console.log("TEXt=->",text , "NAME->",name)  

     if(name == "otp1"){      
       setInput({...input,value1:text})  
       textInput2.focus()
       if(text.length==0){
         textInput1.focus()
       }      
     }
     if(name == "otp2"){
       setInput({...input,value2:text})  
       textInput3.focus()
       if(text.length==0){
         textInput1.focus()
       }
     }
     if(name == "otp3"){
       setInput({...input,value3:text})  
       textInput4.focus()
       if(text.length==0){
         textInput2.focus()
       }
     }
     if(name == "otp4"){
       setInput({...input,value4:text})
       if(text.length==0){
         textInput3.focus()
       }
     }
       
   }

   return(
       <View style={{flex:1,alignItems:'center',backgroundColor:'#fff'}}>
               <KeyboardAvoidingView
                   enabled   behavior="padding"  >
           <ScrollView>
           <Text style={{alignContent:"center",marginTop:50,fontSize:30}}>Enter OTP</Text>

             <View style={Style.containerInput}>
               <TextInput
                   maxLength={1}
                   ref={ (input)=> textInput1 = input }
                   style={Style.textInput}
                   onChangeText={ (text)=> onChangeText("otp1",text)}
                   value={input.value1}
                   autoFocus={true}
                   returnKeyType='done'
                   keyboardType='numeric'                
                   />
                   <TextInput
                   maxLength={1}
                   ref={ (input)=> textInput2 = input }
                   style={Style.textInput}
                   onChangeText={ (text)=> onChangeText("otp2",text)}
                   value={input.value2}
                   returnKeyType='done'
                   keyboardType='numeric'                
                   />
                   <TextInput
                   maxLength={1}
                   ref={ (input)=> textInput3 = input }
                   style={Style.textInput}
                   onChangeText={ (text)=> onChangeText("otp3",text)}
                   value={input.value3}
                   returnKeyType='done'
                   keyboardType='numeric'                
                   />
                   <TextInput
                   maxLength={1}
                   ref={ (input)=> textInput4 = input }
                   style={Style.textInput}
                   onChangeText={ (text)=> onChangeText("otp4",text)}
                   value={input.value4}                
                   onSubmitEdit ing={()=>alert(input.value1+input.value2+input.value3+input.value4)}
                   returnKeyType='done'
                   keyboardType='numeric'                
                   />                    
               </View>
             </ScrollView>
          </KeyboardAvoidingView>
       </View>
   )
}

const Style = StyleSheet.create({
   containerAvoidingView:{
       flex:1,
       alignItems:"center",              
   },
   containerInput:{
     justifyContent:"space-between",
     alignItems:'center',      
     height:30,
     width:'60%',
     flexDirection:"row"
   }
   ,
   textInput:{      
     paddingLeft:10,
     height:30,
     width:30,
     margin:10,
     borderWidth:1,
     borderRadius:4,
     borderColor:"#808080",
     backgroundColor:"#fff"
   }
})