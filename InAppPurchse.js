import React, {Component,useEffect,useState} from 'react';
LogBox.ignoreAllLogs();
import {
  SafeAreaView,
  StyleSheet,
  Text,
  LogBox,
  Image,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import RNIap, {
  Product,
  ProductPurchase,
  PurchaseError,
  acknowledgePurchaseAndroid,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
import DeviceInfo from 'react-native-device-info'
const Is_IOS = Platform.OS =='ios' ;
const Is_ANDROID = Platform.OS =='android' ;
const IOS_VERSION = DeviceInfo.getSystemVersion();
console.log("IOS_VERSION===>", IOS_VERSION);
const password = 'f3b07c5a4dda43619647ab834dc391ad';   // you get this password from www.apple.developer.com in subscription sections.

const subscriptionProductId = [    
    'com.subscription.demoIap',        // subscription 1
    "com.subscription.demoIap2",       // subscription 2
    "com.subscription.demoIap3",       // subscription 3
    "com.subscription.demoIap4",       // subscription 4
    "com.subscription.demoIap5",       // subscription 5

];



const itemSkus = Platform.select({
  ios: [subscriptionProductId,],
  android: [subscriptionProductId],
});
const itemSubs = Platform.select({ios: ['T-shirt'], android: ['test.sub']});

let purchaseUpdateSubscription = null;
let purchaseErrorSubscription = null;

const App = ( ) => {
  const [productList,setProductList ] = useState([]);
  const [connectionStore,setConnectionStore] = useState(false);

  useEffect(()=>{
    initConnectionFn();
    cleanPreviousSubscriprion();
    getPurchaseUpdated();
    console.log("RNIap==Functions==>",RNIap);

    return ()=>{
    if(purchaseUpdateSubscription) {
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
    }
    if (purchaseErrorSubscription) {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
      }
    };

  },[])


  const cleanPreviousSubscriprion  = async() =>{
     if (Is_ANDROID) {
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
    } else {
      await RNIap.clearTransactionIOS();
    }
  }
  


  const initConnectionFn = async( ) =>{
    RNIap.initConnection().catch((error)=>{
      console.log("ERROR:=initConnection==>",error);
    }).then(async(connection)=>{
      console.log("Connected to store..",connection);
      setConnectionStore(connection);    
      if(connection){
        const products = await RNIap.getSubscriptions(itemSkus);
        console.log("products===>",products);
        if (products.length !== 0){
          if(Platform.OS === 'android'){
            setProductList(products);
            //code for android
          }else if(Platform.OS === 'ios'){
            setProductList(products);            
          }else {
            alert("oops! ,something went wrong.")
          }
        }
      }
    });   
  }



  const ValidateIOSreceipt = async(receiptInBase64) =>{
    const receiptBody = {
      'receipt-data': receiptInBase64,
      'password': password
    };
    const result = await RNIap.validateReceiptIos(receiptBody, true);
    console.log("ValidateIOSreceipt==>",result);
  }

  const getPurchaseUpdated = async( )=>{
    console.log("getPurchaseUpdated func called");
   
    purchaseUpdateSubscription =await RNIap.purchaseUpdatedListener(
      async (purchase) => {
        console.log("purchase==>", purchase);
        const receipt = purchase.transactionReceipt;
          ValidateIOSreceipt(receipt);
        console.log("receipt==>", receipt);
        if (receipt) {
          try {
            await RNIap.finishTransaction(purchase,true);
            purchaseErrorSubscription = purchaseErrorListener((error)=>{
              console.log('purchaseErrorListener', error) 
            })
          } catch (ackErr) {
 
            console.log('ackErr INAPP>>>>', ackErr);
 
          }  
        }
      }
    );
    console.log("purchaseUpdateSubscription==>", purchaseUpdateSubscription);
  }
  
 



 const fetchProduct = async( )=>{
    const products = await RNIap.getProducts(itemSkus);
    console.log("fetchProduct===>",products);
    this.setState({productList:products})
  }
  // async componentDidMount(): void {
  //   console.log("initconnection=>>",RNIap.initConnection);
  //   try {
  //     const result = await RNIap.initConnection();
  //     console.log('connection is => ', result);
  //     await RNIap.consumeAllItemsAndroid();
  //   } catch (err) {
  //     console.log('error in cdm => ', err);
  //   }
  //   purchaseUpdateSubscription = purchaseUpdatedListener(
  //     async (purchase: ProductPurchase) => {
  //       console.log('purchaseUpdatedListener', purchase);
  //       if (
  //         purchase.purchaseStateAndroid === 1 &&
  //         !purchase.isAcknowledgedAndroid
  //       ) {
  //         try {
  //           const ackResult = await acknowledgePurchaseAndroid(
  //             purchase.purchaseToken,
  //           );
  //           console.log('ackResult', ackResult);
  //         } catch (ackErr) {
  //           console.warn('ackErr', ackErr);
  //         }
  //       }
  //       this.purchaseConfirmed();
  //       this.setState({receipt: purchase.transactionReceipt});
  //       purchaseErrorSubscription = purchaseErrorListener(
  //         (error: PurchaseError) => {
  //           console.log('purchaseErrorListener', error);
  //           // alert('purchase error', JSON.stringify(error));
  //         },
  //       );
  //     },
  //   );
  // }
  // componentWillUnmount(): void {
  //   if (purchaseUpdateSubscription) {
  //     purchaseUpdateSubscription.remove();
  //     purchaseUpdateSubscription = null;
  //   }
  //   if (purchaseErrorSubscription) {
  //     purchaseErrorSubscription.remove();
  //     purchaseErrorSubscription = null;
  //   }
  // }
const getItems = async ()=> {
    try {
      console.log('itemSkus[0]', itemSkus[0]);
      const products = await RNIap.getProducts(itemSkus);
      console.log('Products[0]', products);
      // this.setState({productList: products});
      this.requestPurchase(itemSkus[0]);
    } catch (err) {
      console.log('getItems || purchase error => ', err);
    }
  };

 const getAvailablePurchases = async ()=> {
    try {
      const purchases = await RNIap.getAvailablePurchases();
      console.log('Available purchases => ', purchases);
      // if (purchases && purchases.length > 0) {
      //   this.setState({
      //     availableItemsMessage: `Got ${purchases.length} items.`,
      //     receipt: purchases[0].transactionReceipt,
      //   });
      // }
    } catch (err) {      
      console.log('getAvailablePurchases error => ', err);
    }
  };
 const requestPurchase = async (sku) => {
    try {
     const ggg = await RNIap.requestPurchase(sku);
     console.log('requestPurchase =>', ggg);
    } catch (err) {
      console.log('requestPurchase error => ', err);
    }
  };
 const requestSubscription = async (sku) => {
    try {
      // await this.getItems();
     const requestSubscription =  await RNIap.requestSubscription(sku);
     console.log('requestSubscription=>', requestSubscription);
    } catch (err) {
      alert(err.toLocaleString());
    }
  };
 const getPurchaseHistory = async() => {
  const getPurchaseHistory =  await RNIap.getPurchaseHistory(true);
  console.log('getPurchaseHistory=>', getPurchaseHistory);
  };

  const cancelSubscriptions = ( ) =>{
    if(Is_IOS){
      const url_IOS_12_Later = 'https://apps.apple.com/account/subscriptions'; //You can do this on iOS 12 or later 
      const url_IOS_12_Earlier = 'https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/manageSubscriptions';
      // Linking.openURL(IOS_VERSION > 12 ? url_IOS_12_Later : url_IOS_12_Earlier);
      Linking.openURL(url_IOS_12_Later);
    
    }else{
      const YOUR_PRODUCT_ID = subscriptionProductId[0]
      const YOUR_PACKAGE_NAME = 'android_app_packageName'  // find in AndroidManifest.xml
      Linking.openURL(`https://play.google.com/store/account/subscriptions?package=${YOUR_PACKAGE_NAME}&sku=${YOUR_PRODUCT_ID}`);
    }
  }
 
    return (
      <SafeAreaView style={styles.rootContainer}>
        <Text style={{marginVertical:20,fontSize:25}}>Connected To Store : {connectionStore ? 'Connected' : 'Not connected'}</Text>
        {productList.length == 0 
        ? <Image
          style={styles.noData}
          resizeMode='contain'
          source={{uri:'http://sasteedeals.com/assets/uploads/nodatafound.png'}}
        />       
        : <Text>{JSON.stringify(productList)}</Text> }
        <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => requestSubscription(subscriptionProductId[0])}
          >
          <Text style={styles.buttonText}>Request Subscription</Text>
        </TouchableOpacity>
        {/* getPurchaseHistory */}

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => getPurchaseHistory()}
          >
          <Text style={styles.buttonText}>Purchase History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => requestPurchase(subscriptionProductId[0])}
          >
          <Text style={styles.buttonText}>Request Purchase</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => getAvailablePurchases()}
          >
          <Text style={styles.buttonText}>Available purchase</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => cancelSubscriptions()}
          >
          <Text style={styles.buttonText}>Subscriptions Cancel</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  
}

export default App;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    marginVertical:5,
    width: '70%',
    height:40,
    backgroundColor: '#000',
    borderRadius: 25,   
    justifyContent: 'center',
    alignItems: 'center',
  },
  noData :{
    width: '100%',
    height:'20%',
    alignSelf:"center",   
  }
  ,
  buttonText: {    
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
