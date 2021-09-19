import {Circle, Popup} from "react-leaflet"
import numeral from "numeral";

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 150,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 200,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 400,
    },
};
export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a,b) => {
        return (a.cases > b.cases) ?  -1 : 1
    })


    return sortedData
}

export const showDataOnMap = (data, casesType='cases') => (
    data.map(country => (
        <Circle
            center= {[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color = {casesTypeColors[casesType].hex}
            fillColor = {casesTypeColors[casesType].hex}
            radius = {Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
        >
            <Popup >
                <div >
                    <div className="info-flag" style={{backgroundImage:`url(${country.countryInfo.flag})`}}/>
                    <div className="info-name"><strong>{country.country}</strong></div>
                    <div className="info-cases"><strong>Cases: </strong>{numeral(country.cases).format("0,0")}</div>
                    <div className="info-recovered"><strong>Recovered:</strong> {numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deaths"><strong>Deaths:</strong> {numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>

        </Circle>
    ))
)


