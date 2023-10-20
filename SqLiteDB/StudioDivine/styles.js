
import { StyleSheet,Dimensions, Platform } from 'react-native';
import { horizontalScale, verticalScale, moderateScale } from '@helpers';

import { GREY_MEDIUM, BLUE_LIGHT,BLUE_MEDIUM } from '@colors';



export const toastStyle = {
    style:{ 
        backgroundColor: "black" 
    },
    textStyle:{ 
        color: "white" 
    },
    position:"center"
    
};

export const textStyle = {
	color: BLUE_LIGHT,
	fontFamily: "Raleway-Bold",
	fontSize: 20,
	left: 0,
	paddingLeft: Platform.OS === "ios" ? 16 : 18,
	paddingTop: 10,
	paddingRight: 8,
	marginBottom: 16,
};




export default styles = StyleSheet.create({
	closeButton: {    
		justifyContent: 'center',
		alignItems: 'center',		
  },
  loader:{
		zIndex:1000,
		top:Dimensions.get('screen').height/2.80,
		position:'absolute',
		alignSelf:"center"
	},
	closeIcon: {
		padding: moderateScale(5),
	},

    msgStyle:{
        fontSize: 25,
        textAlign:"center",
        fontWeight:"bold",
        color:"black",
        marginVertical:20
    }
})