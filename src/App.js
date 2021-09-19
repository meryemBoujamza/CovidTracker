import { Card, CardContent, FormControl, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import './App.css'
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from './components/Table'
import { sortData } from "./util";
import LineGraph from "./components/LineGraph"
import "leaflet/dist/leaflet.css"
//ENDPOINT https://disease.sh/v3/covid-19/countries 

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat:34.80746, lng:-40.4796})
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries,setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("deaths");
  useEffect(() => {
    //async --> send a request wait for it and then do something with the info
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries').then(
        (response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name : country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData)
          setMapCountries(data)
          setCountries(countries)



        })
    }
    getCountriesData(); //call the func 


  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => setCountryInfo(data));
  },[])


  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    //if worldwide then Endpoint /v3/covid-19/all
    //else Endpoint https://disease.sh/v3/covid-19/countries/{country}

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' :
    `https://disease.sh/v3/covid-19/countries/${countryCode}` 

    await fetch(url).then( response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
      setMapCenter({ lat: data.countryInfo.lat, lng: data.countryInfo.long})
      setMapZoom(4)
    } )
  }

  return (
    <div className="app">
      {/* left side of the app*/}
      <div className="app__left">
        <div className="app__header">
          <h1>Ultimate Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>

              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        <Map
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
        />
      </div>
      {/* right side of the app*/}
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>
            Worldwide New{" "}
            {casesType.charAt(0).toUpperCase() + casesType.slice(1)}
          </h3>
        </CardContent>
        <LineGraph casesType={casesType} />
      </Card>
    </div>
  );
}

export default App;
