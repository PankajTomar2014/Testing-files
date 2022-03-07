import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';



const App = (props) => {

 const onPaymentRequest = ( )=>{
  var options = {
    description: 'Credits towards consultation',
    image: 'http://project.thesparxitsolutions.com/DOZERHOUSE/assets/images/logo.png',
    currency: 'INR',
    key: 'rzp_test_fFbWnpLzbxQU0l', // Your api key
    amount: '5000',
    name: 'Dozer',
    prefill: {
      email: 'void@razorpay.com',
      contact: '9191919191',
      name: 'Razorpay by Dozer' 
    },
    theme: {color: '#F37254'}
  }
  RazorpayCheckout.open(options).then((data) => {
    // handle success
    console.log("Success==>",data);
    alert(`Success: ${data.razorpay_payment_id}`);
  }).catch((error) => {
    // handle failure
    console.log("Failure==>",error);
    alert(error.description);
  });
}

  return(
    
    <View style={{flex: 1,alignItems: 'center',justifyContent: 'center',}}>
      <TouchableOpacity
    onPress={()=>onPaymentRequest()}
    style={{
      height:80,
      width:'80%',
      alignItems: 'center',justifyContent: 'center',
      backgroundColor:"#121221"
    }}
    >
      <Text style={{color:"#FFF"}}>{'Pay Now'}</Text>
    </TouchableOpacity>
    </View>
     
    
  )
}
export default App;

// export default CodePush(CODE_PUSH_OPTION)(App);
