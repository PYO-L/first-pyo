import { useEffect, useState } from 'react';
import './Nav.css';

const Nav = ({
  handleSelectChangeSido,
  uniqueSidos,
  items,
  handleBookmarkClick,
  handleSelectChangeStation,
  stations,
}) => {
  const [positionName, setPositionName] = useState('');
  const [temp, setTemp] = useState('');
  function geoOnOk(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log(lat, lon);

    const API_KEY = 'e59755681c2e7f13537a6461ef2e461c';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPositionName(data.name);
        setTemp(data.main.temp);
      });
  }
  function geoOnFail() {
    alert('fail import weather ');
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(geoOnOk, geoOnFail);
  }, []);

  return (
    <div className="nav">
      <span className="title">
        Fine Dust Web
        <img
          className="icon"
          src={process.env.PUBLIC_URL + '/img/미세먼지.png'}
          alt="미세먼지 아이콘"
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: 'white',
          }}
        />
      </span>
      <div className="weather">
        현재위치:{positionName}
        <br></br>ㅤㅤㅤㅤㅤㅤ
        {temp}°C
      </div>

      <div className="sido">
        <select onChange={handleSelectChangeSido}>
          <option value="">전체</option>
          {uniqueSidos.map((sido) => {
            return (
              <option key={sido} value={sido}>
                {sido}
              </option>
            );
          })}
        </select>
      </div>
      <div className="station">
        <select onChange={handleSelectChangeStation}>
          <option value="">전체</option>
          {stations.map((station) => {
            return (
              <option key={station} value={station}>
                {station}
              </option>
            );
          })}
        </select>
      </div>

      <button className="bookmark" onClick={handleBookmarkClick}>
        <img
          src={process.env.PUBLIC_URL + '/img/북마크.png'}
          alt="북마크 아이콘"
          style={{ width: '15px', height: '15px', backgroundColor: 'white' }}
        />
      </button>
    </div>
  );
};

export default Nav;
