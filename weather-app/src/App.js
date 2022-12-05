import React, { useState, useEffect } from 'react';
import './app.css';

function App() {
  // const [lat, setLat] = useState(0)
  // const [long, setLong] = useState(0)
  const [coordinate, setCoordinate] = useState({});
  const [temp, setTemp] = useState(0);
  const [tempDesc, setTempDesc] = useState('');
  const [city,setCity] = useState('lusaka')


  const submitHandler =(event)=>{
event.preventDefault()
    console.log(city) 
    coordinatesGenerator(city)
    setCity('')
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      /* Destructuring the coords property from the position object. */
      /* And also, destructuring the latitude and longitude property from the destructured coords object. */
      const {
        coords: { latitude, longitude }
      } = position;

      setCoordinate({ lat: latitude, long: longitude });
    });
  }, []);

  // useEffect(()=>{
    const coordinatesGenerator=(location)=>{
      fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=33e91f0e5ab0d038782172e3574e3f1e`)
      .then((response) => response.json())
      .then((data) =>  { 
        console.log(data[0].lat,data[0].lon)
        setCoordinate({ lat: data[0].lat, long: data[0].lon })
      }

      
      );

      
      
      
      
      
    
      
    }
    // ;

    // console.log()
    
  // },[setCity])




  useEffect(() => {
    // console.log(coordinate);

    const { lat, long } = coordinate;
    const API_KEY = '29da4ac9ed4552e77d90788296abc187';

    if (lat && long) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          /* Destructuring the main and weather property from the data object. */
          const { main, weather } = data;

          console.log(data);
          // console.log(main.temp);
          // console.log(weather[0].description);

          /* Setting the state of the temp and tempDesc. */
          setTemp(main.temp);
          setTempDesc(weather[0].description);
        })
        .catch((e) => {
          console.log('error:', e);
        });
    }
  }, [coordinate.lat, coordinate.long]);

  return (


    <>
      {!(temp && tempDesc) && <div>loading temperature...</div>}

      {temp && tempDesc && (
        <div className="container">
          
          <form onSubmit={submitHandler}>
          <div className='loc'>Location</div>
            <input className="inpux" placeholder="Enter Location"type="text"  onChange={event => setCity(event.target.value)} />
            {temp && <div className='temp'>{temp}°C</div>}

{tempDesc && <div className='tempdes'>{tempDesc}</div>}
          </form>
          
        </div>
      )}
    </>
  );
}

export default App;
