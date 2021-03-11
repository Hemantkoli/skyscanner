import { Container } from "react-bootstrap";
const BrowseQuotes = (props)=>{
    //if(!props.Quotes.length)
    //{return null;}
    const constructTable = (QuotesList)=>{
        return(
            <div id="main_div">
            {QuotesList.map(index => 
            <div key={index.Carriers.Name} id="second_main_div">
                Quotes<br/>
                Price: {index.MinPrice}<br/>
                DepartureDate: {index.OutboundLeg.DepartureDate}<br/>
                Carriers: {index.Carriers.Name}
            </div>
            )}
            </div>
        )
    };

    return (

        <Container>
            <br></br>
            {constructTable(props.Quotes)}
        </Container>
        
    )
}
export default BrowseQuotes;
