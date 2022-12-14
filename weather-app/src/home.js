import React, { useState, useEffect } from 'react';
import './app.css';

// function App() {
//   // const [lat, setLat] = useState(0)
//   // const [long, setLong] = useState(0)
//   const [coordinate, setCoordinate] = useState({});
//   const [temp, setTemp] = useState(0);
//   const [tempDesc, setTempDesc] = useState('');

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       /* Destructuring the coords property from the position object. */
//       /* And also, destructuring the latitude and longitude property from the destructured coords object. */
//       const {
//         coords: { latitude, longitude }
//       } = position;

//       setCoordinate({ lat: latitude, long: longitude });
//     });
//   }, []);

//   useEffect(() => {
//     // console.log(coordinate);

//     const { lat, long } = coordinate;
//     const API_KEY = '29da4ac9ed4552e77d90788296abc187';

// if (lat && long) {
//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${API_KEY}`
//   )
//     .then((resp) => resp.json())
//     .then((data) => {
//       /* Destructuring the main and weather property from the data object. */
//       const { main, weather } = data;

//       console.log(data);
//       // console.log(main.temp);
//       // console.log(weather[0].description);

//       /* Setting the state of the temp and tempDesc. */
//       setTemp(main.temp);
//       setTempDesc(weather[0].description);
//     })
//     .catch((e) => {
//       console.log('error:', e);
//     });
// }
//   }, [coordinate.lat, coordinate.long]);

//   return (
//     <>
//       {!(temp && tempDesc) && <div>loading temperature...</div>}

//       {temp && tempDesc && (
//         <div className="app">
//           <div>Location</div>
//           <form>
//             <input type="text" />
//           </form>

//           {temp && <div>{temp}°C</div>}

//           {tempDesc && <div>{tempDesc}</div>}
//         </div>
//       )}
//     </>
//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      setCoordinate: {},
      temp: 0,
      tempDescr: ''
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      /* Destructuring the coords property from the position object. */
      /* And also, destructuring the latitude and longitude property from the destructured coords object. */
      const {
        coords: { latitude, longitude }
      } = position;

      this.setState({
        setCoordinate: { lat: latitude, long: longitude }
      });

      // console.log(this.state);

      // console.log(latitude, longitude);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { lat, long } = this.state.setCoordinate;
    const { lat: prevLat, long: prevLong } = prevState.setCoordinate;

    const API_KEY = '29da4ac9ed4552e77d90788296abc187';

    if (prevLat !== lat && prevLong !== long) {
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
          // setTemp(main.temp);
          // setTempDesc(weather[0].description);

          this.setState((prevState) => ({
            ...prevState,
            temp: main.temp,
            tempDescr: weather[0].description
          }));
        })
        .catch((e) => {
          console.log('error:', e);
        });

      // console.log('Lat and and Long dectected', lat, long);
    }
  }

  render() {
    const { temp, tempDescr } = this.state;

    return (
      <>
        {!(temp && tempDescr) && <div>loading temperature...</div>}
        {temp && tempDescr && (
          <div className="app">
            <div>Location</div>
            <form>
              <input type="text" />
            </form>

            {temp && <div>{temp}°C</div>}

            {tempDescr && <div>{tempDescr}</div>}
          </div>
        )}
      </>
    );
  }
}

export default App;

//https://api.openweathermap.org/geo/1.0/direct?q=ndola&limit=1&appid=33e91f0e5ab0d038782172e3574e3f1e