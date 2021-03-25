import React,{useState}from 'react';
import { Container } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import Autocomplete from "./Autocomplete";

import './styles.css';

const Home = (props)=>{
    
    let [error,seterror] = useState(null);
    const [valueForDepartDate, onChangeDepartDate] = useState(new Date());
    const [valueForReturnDate, onChangeReturnDate] = useState(new Date());
    let DepartLoop=0;
    let ReturnLoop=0;


    //For Return Date
    var mm = valueForReturnDate.getMonth() + 1;
    if(mm<10)
    {mm="0"+mm;}
    var dd = valueForReturnDate.getDate();
    ReturnLoop=dd;
    if(dd<10)
    {dd="0"+dd;}
    var yyyy = valueForReturnDate.getFullYear();
    let temp_InboundDate=yyyy+"-"+mm+"-"+dd;
    if(props.InboundPartialDate!="Default Return"&&props.InboundPartialDate!="NA")
    {props.setInboundPartialDate(temp_InboundDate);}
    
    //For Depart Date
    var mm = valueForDepartDate.getMonth() + 1;
    if(mm<10)
    {mm="0"+mm;}
    var dd = valueForDepartDate.getDate();
    DepartLoop=dd;
    if(dd<10)
    {dd="0"+dd;}
    var yyyy = valueForDepartDate.getFullYear();
    let temp_OutboundDate=yyyy+"-"+mm+"-"+dd;
    if(props.OutboundPartialDate!="Default Depart")
    {props.setOutboundPartialDate(temp_OutboundDate);}

    
    console.log(props.OutboundPartialDate);
    console.log(props.InboundPartialDate);
    
    const ReturnorOneway=(event)=> 
    {
        if(event.target.value=="One way")
        {
            props.setInboundPartialDate("NA");
            props.setOutboundPartialDate(temp_OutboundDate);
            //console.log(props.InboundPartialDate);
        }
        if(event.target.value=="Return")
        {
            props.setInboundPartialDate(temp_InboundDate);
            props.setOutboundPartialDate(temp_OutboundDate);
            //console.log(props.InboundPartialDate);   
        }
        
    }

    const handleInputChangeQuery = (event)=>{
        props.setQuery(event.target.value);
    }
    const handleInputChangeCountry = (event)=>{
        props.setCountry(event.target.value);
    }
    const handleInputChangeCurrency = (event)=>{
        props.setCurrency(event.target.value);
    }
    const handleInputChangeLocale = (event)=>{
        props.setLocale(event.target.value);
    }

    const handleInputChangeDestinationPlace = (event)=>{
        props.setDestinationPlace(event.target.value);
    }
    const handleInputChangeOriginPlace = (event)=>{
        props.setOriginPlace(event.target.value);
    }
    const handleInputChangeOutboundPartialDate = (event)=>{
        props.setOutboundPartialDate(event.target.value);
    }
    const handleInputChangeInboundPartialDate = (event)=>{
        props.setInboundPartialDate(event.value);
    }
    const HandleClickOnPlaces = (e)=>{
        e.preventDefault();
        if(props.OriginPlace == "")
        {
            alert("Invalid Origin Place");
            return;
        }
        props.setDestinationPlace("Everywhere");
        props.fetchPlaces();
    }

    const HandleClickOnCheapestDates = (e)=>{
        e.preventDefault();
        if(props.OriginPlace == ""||props.DestinationPlace == ""||props.OutboundPartialDate == "")
        {
            alert("Invalid Origin or Destination or Depart date");
            return;
        }
        if(props.OutboundPartialDate=="Default Depart")
        {
            alert("Invalid Depart date");
            return;
        }

        if(props.InboundPartialDate=="NA"||props.InboundPartialDate=="Default Return")
        {
            props.setDateFlag(false);
            props.fetchCheapestDates();
        }
        else
        {
            if(DepartLoop>ReturnLoop)
            {alert('Enter Valid Dates');}
            else{
            props.setDateFlag(true);
            props.fetchCheapestDatesWithInbound();}
        }

        
        
    }

    const HandleClickOnQuotes = (e)=>{
        e.preventDefault();
        if(props.OriginPlace == ""||props.DestinationPlace == ""||props.OutboundPartialDate == "")
        {
            alert("Invalid Origin or Destination or Depart date");
            return;
        }
        if(props.InboundPartialDate=="NA"||props.InboundPartialDate=="Default Return")
        {
            props.setQuoteFlag(false);
            props.fetchQuotes() ;
        }
        else
        {
            if(DepartLoop>ReturnLoop)
            {alert('Enter Valid Dates');}
            else{
            props.setQuoteFlag(true);
            props.fetchQuotesWithInbound() ;}
        }
        
    }

    const HandleClickOnRoutes = (e)=>{
        e.preventDefault();
        if(props.OriginPlace == ""||props.DestinationPlace == ""||props.OutboundPartialDate == "")
        {
            alert("Invalid Origin or Destination or Depart date");
            return;
        }
        if(props.InboundPartialDate=="NA"||props.InboundPartialDate=="Default Return")
        {
            props.setRouteFlag(false);
            props.fetchRoutes() ;
        }
        else
        {
            if(DepartLoop>ReturnLoop)
            {alert('Enter Valid Dates');}
            else{
            props.setRouteFlag(true);
            props.fetchRoutesWithInbound() ;}
        }
        
    }

    //////////////////////////////////////////////////////

    const blognone = () => {
        fetch(
          "https://jobs-api.blognone.com/search?q=Digital+Marketing&page=1&type=FULL_TIME,INTERNSHIP&func=DEVELOPER"
        ).then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Something went wrong ...");
          }
        });
      };

    //////////////////////////////////////////////////////
    
    return (
        <div id="main_container">
        <label>Let the journey begin</label>
        <Container>
        <div id='home'>  

                    <Autocomplete
                    options={[
                        "Agatti Island Airport->Agatti Island=AGX",
                        "Ahmedabad Airport->Ahmedabad=AMD",
                        "Aizawl Airport->Aizawl=AJL",
                        "Akola Airport->Akola=AKD",
                        "Along Airport->Along=IXV",
                        "Amausi Airport->Lucknow=LKO",
                        "Amritsar Airport->Ludhiana=LUH",
                        "Bagdogra Airport->Bagdogra=IXB",
                        "Bajpe Airport->Mangalore=IXE",
                        "Bakula Rimpoche Airport->Leh=IXL",	
                        "Balurghat Airport->Balurghat=RGH",
                        "Bamrauli Airport->Allahabad=IXD",
                        "Barapani Airport->Shillong=SHL",
                        "Bareli Airport->Bareli=BEK",
                        "Bellary Airport->Bellary=BEP",
                        "Bengaluru International Airport->Bangalore=BLR",
                        "Bhatinda Airport->Bhatinda=BUP",
                        "Bhavnagar Airport->Bhavnagar=BHU",
                        "Bhopal Airport->Bhopal=BHO",
                        "Bhubaneswar Airport->Bhubaneswar=BBI",	
                        "Bikaner Airport->Bikaner=BKB",	
                        "Bilaspur Airport->Bilaspur=PAB",	
                        "Birsa Munda International Airport->Ranchi=IXR",
                        "Borjhar Airport->Guwahati=GAU",
                        
                        "Car Nicobar Airport->Car Nicobar=CBD",	
                        "Chandigarh Airport->Chandigarh=IXC",
                        "Chennai International Airport->Chennai=MAA",	
                        "Chhatrapati Shivaji International Airport->Mumbai=BOM",
                        "Chikkalthana Airport->Aurangabad=IXU",
                        "Cochin International Airport->Kochi=COK",	
                        "Cooch Behar Airport->Cooch Behar=COH",	
                        "Cuddapah Airport->Cuddapah=CDP",	
                        
                        "Dabok Airport->Udaipur=UDR",	
                        "Dabolim Airport->Goa=GOI",	
                        "Daman Airport->Daman=NMB",	
                        "Daparizo Airport->Daparizo=DAE",	
                        "Darjeeling Airport->Darjeeling=DAI",	
                        "Dehra Dun Airport->Dehra Dun=DED",	
                        "Deparizo Airport->Deparizo=DEP",	
                        "Devi Ahilyabai Holkar Airport->Indore=IDR",	
                        "Dhanbad Airport->Dhanbad=DBD",	
                        "Dibrugarh Airport->Dibrugarh=DIB",	
                        "Dimapur Airport->Dimapur=DMU",	
                        "Diu Airport->Diu=DIU",	
                        
                        "Gaggal Airport->Dharamsala=DHM",	
                        "Gandhinagar Airport->Nasik=ISK",	
                        "Gaya Airport->Gaya=GAY",	
                        "Gorakhpur Airport->Gorakhpur=GOP",	
                        "Govardhanpur Airport->Jamnagar=JGA",	
                        "Guna Airport->Guna=GUX",	
                        "Gwalior Airport->Gwalior=GWL",	
                        
                        "Hissar Airport->Hissar=HSS",	
                        "Hubli Airport->Hubli=HBX",	
                        "Hyderabad International Airport->Hyderabad=HYD",	
                        
                        "Indira Gandhi International Airport->New Delhi=DEL",
                        
                        "Jabalpur Airport->Jabalpur=JLR",	
                        "Jagdalpur Airport->Jagdalpur=JGB",	
                        "Jaisalmer Airport->Jaisalmer=JSA",	
                        "Jeypore Airport->Jeypore=PYB",	
                        "Jodhpur Airport->Jodhpur=JDH",	
                        
                        "Kailashahar Airport->Kailashahar=IXH",	
                        "Kamalpur Airport->Kamalpur=IXQ",
                        "Kandla Airport->Kandla=IXY",	
                        "Kanpur Airport->Kanpur=KNU",	
                        "Keshod Airport->Keshod=IXK",	
                        "Khajuraho Airport->Khajuraho=HJR",	
                        "Kheria Airport->Agra=AGR",
                        "Khowai Airport->Khowai=IXN",	
                        "Kolhapur Airport->Kolhapur=KLH",
                        "Kota Airport->Kota=KTU",	
                        "Kozhikode Airport->Kozhikode=CCJ",	
                        "Kullu Manali Airport->Bhuntar Kullu=KUU",	
                        "Kumbhirgram Airport->Silchar=IXS",	
                        
                        "Lilabari Airport->Lilabari=IXI",	
                        "Lohegaon Airport->Pune=PNQ",	
                        
                        "Madurai Airport->Madurai=IXM",	
                        "Malda Airport->Malda=LDA",	
                        "Mohanbari Airport->Mohanbari=MOH",	
                        "Municipal Airport->Imphal=IMF",	
                        "Muzaffarnagar Airport->Muzaffarnagar=MZA",	
                        "Muzaffarpur Airport->Muzaffarpur=MZU",	
                        "Mysore Airport->Mysore=MYQ",	
                        
                        "Nanded Airport->Nanded=NDC",
                        "Netaji Subhash Chandra Bose International Airport->Kolkata=CCU",	
                        "Neyveli Airport->Neyveli=NVY",
                        
                        "Osmanabad Airport->Osmanabad=OMN",
                        
                        "Pantnagar Airport->Pantnagar=PGH",	
                        "Pasighat Airport->Pasighat=IXT",	
                        "Pathankot Airport->Pathankot=IXP",	
                        "Patna Airport->Patna=PAT",	
                        "Peelamedu Airport->Coimbatore=CJB",
                        "Pondicherry Airport->Pondicherry=PNY",	
                        "Porbandar Airport->Porbandar=PBD",	
                        "Port Blair Airport->Port Blair=IXZ",
                        "Puttaparthi Airport->Puttaparthi=PUT",
                        
                        "Raipur Airport->Raipur=RPR",	
                        "Raja Sansi Airport->Amritsar=ATQ",	
                        "Rajahmundry Airport->Rajahmundry=RJA",	
                        "Rajkot Airport->Rajkot=RAJ",	
                        "Rajouri Airport->Rajouri=RJI",	
                        "Ramagundam Airport->Ramagundam=RMD",	
                        "Ratnagiri Airport->Ratnagiri=RTC",	
                        "Rewa Airport->Rewa=REW",	
                        "Rourkela Airport->Rourkela=RRK",	
                        "Rowriah Airport->Jorhat=JRH",	
                        "Rudra Mata Airport->Bhuj=BHJ",	
                        "Rupsi Airport->Rupsi=RUP",	
                        
                        "Salem Airport->Salem=SXV",
                        "Salonibari Airport->Tezpur=TEZ",	
                        "Sambre Airport->Belgaum=IXG",	
                        "Sanganeer Airport->Jaipur=JAI",
                        "Satna Airport->Satna=TNI",
                        "Satwari Airport->Jammu=IXJ",	
                        "Sholapur Airport->Sholapur=SSE",	
                        "Simla Airport->Simla=SLV",	
                        "Singerbhil Airport->Agartala=IXA",	
                        "Sonari Airport->Jamshedpur=IXW",	
                        "Sonegaon Airport->Nagpur=NAG",	
                        "Srinagar Airport->Srinagar=SXR",	
                        "Surat Airport->Surat=STV",	
                        
                        "Tezu Airport->Tezu=TEI",	
                        "Thanjavur Airport->Thanjavur=TJV",
                        "Thiruvananthapuram International Airport->Trivandrum=TRV",
                        "Tirupati Airport->Tirupati=TIR",
                        "Trichy Airport->Trichy=TRZ",	
                        "Tuticorin Airport->Tuticorin=TCR",
                        
                        "Vadodara Airport->Vadodara=BDQ",	
                        "Varanasi Airport->Varanasi=VNS",	
                        "Vijayawada Airport->Vijayawada=VGA",	
                        "Vishakhapatnam Airport->Vishakhapatnam=VTZ",	
                        
                        "Warangal Airport->Warangal=WGC",
                        
                        "Zero Airport->Zero=ZER"			
                    ]}
                />


                <div id="radio" onChange={ReturnorOneway}>
                <input id="Return" type="radio" value="Return" name="radio" /> Return&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input id="One way" type="radio" value="One way" name="radio" /> One way
                </div>  
                                   
                <div id="labels">From
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                To
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Depart
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;
                Return
                </div>
                <input
                value={props.OriginPlace} className="input_first" type="text" placeholder="Country, city or airport" onChange={handleInputChangeOriginPlace}>
                </input>

                <input
                value={props.DestinationPlace} className="input_second" type="text" placeholder="Country, city or airport" onChange={handleInputChangeDestinationPlace}>
                </input>

                <span id="DepartDateSpan">  
                <DatePicker
                    onChange={onChangeDepartDate}
                    value={valueForDepartDate}
                /></span>

                <span id="ReturnDateSpan">
                <DatePicker
                    onChange={onChangeReturnDate}
                    value={valueForReturnDate}
                /></span>
            
            </div>
            <div>
            <table>
            <thead></thead>
            <tbody>
            <tr>
            <td>
            
            <button className="button_class" onClick={HandleClickOnPlaces}>Browse Places</button>
            </td>
            <td>
            
            <button className="button_class" onClick={HandleClickOnCheapestDates}>Browse Dates</button>
            </td>
            <td>
            
            <button className="button_class" onClick={HandleClickOnQuotes}>Broswe Quotes</button>
            </td>
            <td>
        
            <button className="button_class" onClick={HandleClickOnRoutes}>Broswe Routes</button>
            </td>
            </tr>
            </tbody>
            </table>
        </div>
        </Container>   
        </div> 
    )
}

export default Home;