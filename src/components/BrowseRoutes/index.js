import { Container } from "react-bootstrap";
const BrowseRoutes = (props)=>{
    //if(!props.Quotes.length)
    //{return null;}
    const constructTable = (RoutesList)=>{
        return(
            <div id="main_div">
            {RoutesList.map(index => 
            <div key={index.Carriers.Name} id="second_main_div">
                Routes<br/>
                Price: {index.MinPrice}<br/>
                DepartureDate: {index.OutboundLeg.DepartureDate}<br/>
                Carriers: {index.Carriers.Name}
                {props.RouteFlag
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
            {constructTable(props.Routes)}
        </Container>
        
    )
}
export default BrowseRoutes;
