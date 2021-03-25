import { StrictMode, useState } from 'react';
import Home from './components/Home/index'
import BrowsePlaces from './components/BrowsePlaces/index'
import BrowseDates from './components/BrowseDates/index'
import BrowseQuotes from './components/BrowseQuotes/index'
import BrowseRoutes from './components/BrowseRoutes/index'

import axios from "axios";

const App = ()=>
{
    let [Query,setQuery] = useState("");
    let [DateFlag,setDateFlag] = useState(false);
    let [QuoteFlag,setQuoteFlag] = useState(false);
    let [RouteFlag,setRouteFlag] = useState(false);

    let [Country,setCountry] = useState("IN");
    let [Currency,setCurrency] = useState("INR");
    let [Locale,setLocale] = useState("hi_IN");
    
    let [DestinationPlace,setDestinationPlace] = useState("");
    let [OriginPlace,setOriginPlace] = useState("");
    let [OutboundPartialDate,setOutboundPartialDate] = useState("Default Depart");
    let [InboundPartialDate,setInboundPartialDate] = useState("Default Return");

    let [Places,setPlaces] = useState([]);
    let [cheapestDates,setCheapestDates] = useState([]);
    let [Quotes,setQuotes] = useState([]);
    let [Routes,setRoutes] = useState([]);


    const fetchPlaces = ()=>
    {
        //let temp_url='https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/';
        //let temp_Query='Stockholm';
        //setQuery(OriginPlace);
        let constrcuted_url=`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/${Country}/${Currency}/${Locale}/`;
        const options = {   
        method: 'GET',
        url: constrcuted_url,
        params: {query: OriginPlace},
        headers: {
            'x-rapidapi-key': '321cf266bfmsh3a10c4c9b585930p102a69jsnf4889d10bc4d',
            'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
        }
        };

        axios.request(options).then(function (response) {
            
            let result_arr=response.data.Places;
            setCheapestDates([]);
            setQuotes([]);
            setRoutes([]);
            setPlaces(result_arr);
        }).catch(function (error) {
            console.error(error);
        });
    }


    const fetchCheapestDates = ()=>
    {
        //let temp_url='https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/SFO-sky/LAX-sky/2021-03-14';
        //let temp_InboundPartialDate='2021-03-14';
       let constrcuted_url=`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/${Country}/${Currency}/${Locale}/${OriginPlace}/${DestinationPlace}/${OutboundPartialDate}`;
        const options = {
            method: 'GET',
            url: constrcuted_url,
            headers: {
              'x-rapidapi-key': '321cf266bfmsh3a10c4c9b585930p102a69jsnf4889d10bc4d',
              'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
            }
          };
                
        axios.request(options).then(function (response) {
            //console.log(response.data);
            let result_arr=response.data.Quotes;
            let CarriersArray=response.data.Carriers;
            let i=0;
            result_arr.map(index =>index.Carriers=CarriersArray[i++]) 
           // console.log(result_arr);
        
            setQuotes([]);
            setRoutes([]);
            setPlaces([]);
            setCheapestDates(result_arr);
        }).catch(function (error) {
            console.error(error);
        });
    }

    const fetchCheapestDatesWithInbound = ()=>
    {
        //let temp_url='https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/SFO-sky/LAX-sky/2021-03-14';
        //let temp_InboundPartialDate='2021-03-14';
        //'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/IN/INR/hi_IN/BOM/DEL/2021-03-18/2021-03-24',
        

       let constrcuted_url=`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/${Country}/${Currency}/${Locale}/${OriginPlace}/${DestinationPlace}/${OutboundPartialDate}/${InboundPartialDate}`;
        const options = {
            method: 'GET',
            url: constrcuted_url,
            headers: {
              'x-rapidapi-key': '321cf266bfmsh3a10c4c9b585930p102a69jsnf4889d10bc4d',
              'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
            }
          };
                
        axios.request(options).then(function (response) {
           // console.log(response.data.Quotes.Dates.InboundLeg);
            let result_arr_Inbound=response.data.Quotes;
            let CarriersArray=response.data.Carriers;
            let i=0;
            result_arr_Inbound.map(index =>index.Carriers=CarriersArray[i++]) 

            //console.log(result_arr_Inbound);
        
            setQuotes([]);
            setRoutes([]);
            setPlaces([]);
            setCheapestDates(result_arr_Inbound);
        }).catch(function (error) {
            console.error(error);
        });
    }

    
    const fetchQuotes = ()=>
    {
        //let temp_url='https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/LAX-sky/2021-03-14';
        //let temp_InboundPartialDate='';
        let constrcuted_url=`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${Country}/${Currency}/${Locale}/${OriginPlace}/${DestinationPlace}/${OutboundPartialDate}`;
       
        const options = {
        method: 'GET',
        url: constrcuted_url,
        headers: {
            'x-rapidapi-key': '321cf266bfmsh3a10c4c9b585930p102a69jsnf4889d10bc4d',
            'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
        }
        };        
        axios.request(options).then(function (response) {
            //console.log(response.data);
            let result_arr=response.data.Quotes;
            let CarriersArray=response.data.Carriers;
            let i=0;
            result_arr.map(index =>index.Carriers=CarriersArray[i++]) 
            console.log(result_arr);
            setCheapestDates([]);
            setRoutes([]);
            setPlaces([]);
            setQuotes(result_arr);
        }).catch(function (error) {
            console.error(error);
        });
    }

    const fetchQuotesWithInbound = ()=>
    {
        //let temp_url='https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/LAX-sky/2021-03-14';
        //let temp_InboundPartialDate='';
        let constrcuted_url=`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/${Country}/${Currency}/${Locale}/${OriginPlace}/${DestinationPlace}/${OutboundPartialDate}/${InboundPartialDate}`;
       
        const options = {
        method: 'GET',
        url: constrcuted_url,
        headers: {
            'x-rapidapi-key': '321cf266bfmsh3a10c4c9b585930p102a69jsnf4889d10bc4d',
            'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
        }
        };        
        axios.request(options).then(function (response) {
            //console.log(response.data);
            let result_arr_Inbound=response.data.Quotes;
            let CarriersArray=response.data.Carriers;
            let i=0;
            result_arr_Inbound.map(index =>index.Carriers=CarriersArray[i++]) 
            //console.log(result_arr);
            setCheapestDates([]);
            setRoutes([]);
            setPlaces([]);
            setQuotes(result_arr_Inbound);
        }).catch(function (error) {
            console.error(error);
        });
    }
    
    const fetchRoutes = ()=>
    {
        //let temp_url='https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/SFO-sky/LAX-sky/2021-03-14';
        //let temp_InboundPartialDate='';
        let constrcuted_url=`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${Country}/${Currency}/${Locale}/${OriginPlace}/${DestinationPlace}/${OutboundPartialDate}`;
       
        const options = {
            method: 'GET',
            url: constrcuted_url,
            headers: {
              'x-rapidapi-key': '321cf266bfmsh3a10c4c9b585930p102a69jsnf4889d10bc4d',
              'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            //console.log(response.data);
            let result_arr=response.data.Quotes;
            let CarriersArray=response.data.Carriers;
            let i=0;
            result_arr.map(index =>index.Carriers=CarriersArray[i++]) 
            console.log(result_arr);
            setCheapestDates([]);
            setQuotes([]);
            setPlaces([]);
            setRoutes(result_arr);
        }).catch(function (error) {
            console.error(error);
        });
    }

    const fetchRoutesWithInbound = ()=>
    {
        //let temp_url='https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/SFO-sky/LAX-sky/2021-03-14';
        //let temp_InboundPartialDate='';
        let constrcuted_url=`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${Country}/${Currency}/${Locale}/${OriginPlace}/${DestinationPlace}/${OutboundPartialDate}/${InboundPartialDate}`;
       
        const options = {
            method: 'GET',
            url: constrcuted_url,
            headers: {
              'x-rapidapi-key': '321cf266bfmsh3a10c4c9b585930p102a69jsnf4889d10bc4d',
              'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            //console.log(response.data);
            let result_arr_InboundRoute=response.data.Quotes;
            let CarriersArray=response.data.Carriers;
            let i=0;
            result_arr_InboundRoute.map(index =>index.Carriers=CarriersArray[i++]) 
            //console.log(result_arr);
            setCheapestDates([]);
            setQuotes([]);
            setPlaces([]);
            setRoutes(result_arr_InboundRoute);
        }).catch(function (error) {
            console.error(error);
        });
    }

    

    return(
    <StrictMode>
        <Home fetchPlaces={fetchPlaces} fetchCheapestDates={fetchCheapestDates} fetchCheapestDatesWithInbound={fetchCheapestDatesWithInbound} fetchQuotes={fetchQuotes} fetchQuotesWithInbound={fetchQuotesWithInbound} fetchRoutes={fetchRoutes} fetchRoutesWithInbound={fetchRoutesWithInbound} setDateFlag={setDateFlag} setQuoteFlag={setQuoteFlag} setRouteFlag={setRouteFlag} Query={Query} setQuery={setQuery} Country={Country} setCountry={setCountry} Currency={Currency} setCurrency={setCurrency} Locale={Locale} setLocale={setLocale} DestinationPlace={DestinationPlace} setDestinationPlace={setDestinationPlace} OriginPlace={OriginPlace} setOriginPlace={setOriginPlace} OutboundPartialDate={OutboundPartialDate} setOutboundPartialDate={setOutboundPartialDate} InboundPartialDate={InboundPartialDate} setInboundPartialDate={setInboundPartialDate}></Home>
        <BrowsePlaces Places={Places}></BrowsePlaces>
        <BrowseDates cheapestDates={cheapestDates} DateFlag={DateFlag}></BrowseDates>
        <BrowseQuotes Quotes={Quotes} QuoteFlag={QuoteFlag}></BrowseQuotes>
        <BrowseRoutes Routes={Routes} RouteFlag={RouteFlag}></BrowseRoutes>
    </StrictMode>)

}
export default App;