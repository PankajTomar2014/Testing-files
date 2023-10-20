import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import StudioDivineView from './StudioDivineScreenWithDB'


const StudioDivine = (props) =>{

    

    useEffect(()=>{
        console.log("transactions---------->",props);
    },[])


    return(
        <StudioDivineView
            isConnected={props.network && props.network.isConnected}
            // contactUs={props.contactUs}
            color_scheme={props.color_scheme}          
            transactions={props.transactions}
            navigation={props.navigation}
            // getDailyUpdates={props.getDailyUpdates}
            // addContact={props.addContact}
            // getTransactionList={props.getTransactionList}
            // user={props.user}
          

        
        />
    )
};

function mapStateToProps(state) {
	return {
		// user: state.quoteReducer.user,
		// contactUs: state.quoteReducer.contactUs,
		color_scheme: state.quoteReducer.color_scheme,
		transactions: state.quoteReducer.transactions,
		network: state.quoteReducer.network,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// getDailyUpdates: (x) => dispatch(loginActions.getDailyUpdates(x)),
		// addContact: (contactUs) => dispatch(loginActions.addContact(contactUs)),
		getTransactionList: (contactUs) =>
			dispatch(loginActions.getTransactionList(contactUs)),
		// updateActiveRouteName: (x) =>
		// 	dispatch(OnBoardActions.updateActiveRouteName(x)),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StudioDivine);