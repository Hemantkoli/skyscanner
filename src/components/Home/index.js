import React,{useState}from 'react';
import { Container } from 'react-bootstrap';
import './styles.css';

const Home = (props)=>{
    
    let [error,seterror] = useState(null);
    
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
        props.setInboundPartialDate(event.target.value);
    }
    const HandleClick = (e)=>{
        e.preventDefault();
        //if(props.Query == ""||props.Country == ""||props.Currency == ""||props.Locale == ""){
          //  seterror("Invalid Input");
            //return;
       // }
        props.fetchPlaces();
    }

    const HandleClickOnCheapestDates = (e)=>{
        e.preventDefault();
        //if(props.Query == ""){
          //  seterror("Invalid Input");
      //      return;
       // }
        //console.log("handle clicl on cheapesdate");
        props.fetchCheapestDates();
    }

    const HandleClickOnQuotes = (e)=>{
        e.preventDefault();
        //if(props.Query == ""){
          //  seterror("Invalid Input");
      //      return;
       // }
        //console.log("handle clicl on cheapesdate");
        props.fetchQuotes() ;
    }

    const HandleClickOnRoutes = (e)=>{
        e.preventDefault();
        //if(props.Query == ""){
          //  seterror("Invalid Input");
      //      return;
       // }
        //console.log("handle clicl on cheapesdate");
        props.fetchRoutes() ;
    }
    
    return (
        <div id="main_container">
        <label>Let the journey begin</label>
        <Container>
        <div id='home'>  

            
                <input
                value={props.OriginPlace} className="input_first" type="text" placeholder="Country, city or airport" onChange={handleInputChangeOriginPlace}>
                </input>

                <input
                value={props.DestinationPlace} className="input_second" type="text" placeholder="Country, city or airport" onChange={handleInputChangeDestinationPlace}>
                </input>

                <input
                value={props.OutboundPartialDate} className="input_small" type="text" placeholder="Enter Depart Date" onChange={handleInputChangeOutboundPartialDate}>
                </input>

                <input
                value={props.InboundPartialDate} className="input_small" type="text" placeholder="Enter Return Date" onChange={handleInputChangeInboundPartialDate}>
                </input>

                <br/>

                <input 
                value={props.Query} className="input_first" type="text" placeholder="Enter Query" onChange={handleInputChangeQuery}>
                </input>
                
                <input
                value={props.Country} className="input_second" type="text" placeholder="Enter Country" onChange={handleInputChangeCountry}>
                </input>

                <input
                value={props.Currency} className="input_small" type="text" placeholder="Enter Currency" onChange={handleInputChangeCurrency}>
                </input>

                <input
                value={props.Locale} className="input_small" type="text" placeholder="Enter Locale" onChange={handleInputChangeLocale}>
                </input>
            
            </div>
            <div>
            <table>
            <thead></thead>
            <tbody>
            <tr>
            <td>
            <p className="text-danger">{error}</p>
            <button className="button_class" onClick={HandleClick}>Browse Places</button>
            </td>
            <td>
            <p className="text-danger">{error}</p>
            <button className="button_class" onClick={HandleClickOnCheapestDates}>Browse Dates</button>
            </td>
            <td>
            <p className="text-danger">{error}</p>
            <button className="button_class" onClick={HandleClickOnQuotes}>Broswe Quotes</button>
            </td>
            <td>
            <p className="text-danger">{error}</p>
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