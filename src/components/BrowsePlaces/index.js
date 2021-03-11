import { Container } from "react-bootstrap";
import './styles.css';

const BrowsePlaces = (props)=>{
    if(!props.Places.length)
    {return null;}
    const constructTable = (PlaceList)=>{
        return(
        <div id="main_div">
            {PlaceList.map(index => 
            <div key={index.PlaceId} id="second_main_div">
                Places<br/>
                Place: {index.PlaceName}<br/>
                Country: {index.CountryName}
            </div>
            )}
        </div>
        )
    };

    return (

        <Container>
            <br></br>
            {constructTable(props.Places)}
        </Container>
        
    )
}
export default BrowsePlaces;


/*<Table striped bordered hover size="sm">
                <thead>

                </thead>

                <tbody>
                    <tr>
                        <th>PlaceId</th>
                        <td>{props.weatherinfo[0].PlaceId}</td>
                    </tr>
                    <tr>
                        <th>PlaceName</th>
                        <td>{props.weatherinfo[0].PlaceName}</td>
                    </tr>
                    <tr>
                        <th>CountryId</th>
                        <td>{props.weatherinfo[0].CountryId}</td>
                    </tr>
                    <tr>
                        <th>RegionId</th>
                        <td>{props.weatherinfo[0].RegionId}</td>
                    </tr>
                    <tr>
                        <th>CityId</th>
                        <td>{props.weatherinfo[0].CityId}</td>
                    </tr>
                    <tr>
                        <th>CountryName</th>
                        <td>{props.weatherinfo[0].CountryName}</td>
                    </tr>
                </tbody>
            </Table>*/