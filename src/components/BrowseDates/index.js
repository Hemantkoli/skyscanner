import { Container } from "react-bootstrap";
const BrowseDates = (props)=>{
    //if(!props.cheapestDates.length)
    //{return null;}

    const constructTable = (CheapDateList)=>{
        return(
            
            <div id="main_div">
            {CheapDateList.map(index => 
            <div key={index.Carriers.Name} id="second_main_div">
                Dates<br/>
                Price: {index.MinPrice}<br/>
                DepartureDate: {index.OutboundLeg.DepartureDate}<br/>
                Carriers: {index.Carriers.Name}
                {props.DateFlag
                ?<><br/>ReturnDate: {index.InboundLeg.DepartureDate}</>
                :<></>
                }         
            </div>
            )}
            </div>
        )
    };

    return (

        <Container>
            <br></br>
            {constructTable(props.cheapestDates)}
        </Container>
        
    )
}
export default BrowseDates;
