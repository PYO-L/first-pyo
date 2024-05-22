import React, { useState } from 'react';
import styled from 'styled-components';

function StationCard({ item, isChecked, handleCheck }) {
  const [coValue, setCoValue] = useState('');
  const [pm25Value, setPm25Value] = useState('');
  const [btnCheck, setBtnCheck] = useState(false);
  function handleClickBtn() {
    setCoValue(item.coValue);
    setPm25Value(item.pm25Value);
    setBtnCheck(!btnCheck);
  }
  return (
    <Card pm10={item.pm10Value}>
      <Input>
        <input
          className="bookmark"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheck}
        />
      </Input>
      <DataTime>{item.dataTime}</DataTime>
      <SidoName>{item.sidoName}</SidoName>
      <StationName>({item.stationName})</StationName>

      <DustLevel>미세먼지 농도: {item.pm10Value}</DustLevel>
      <Btn>
        <button onClick={handleClickBtn}>➕</button>
      </Btn>
      {btnCheck && (
        <Plus>
          <div>
            일산화 탄소 농도:{coValue}
            <br></br>
            초미세먼지 농도:{pm25Value}
          </div>
        </Plus>
      )}
    </Card>
  );
}

const Card = styled.div`
  background-image: url(${process.env.PUBLIC_URL}/img/${(props) => {
    const pm10 = parseInt(props.pm10);
    if (pm10 <= 20) return '좋음.jpg';
    else if (pm10 <= 40) return '보통.jpg';
    else if (pm10 <= 80) return '나쁨.jpg';
    else if (pm10 <= 150) return '최악.jpg';
    else return;
  }});
  background-size: 100% 50%; /* 이미지의 가로 크기를 카드의 절반으로 설정 */
  background-position: center top 40%;
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  background-color: ${(props) => {
    const pm10 = parseInt(props.pm10);
    if (pm10 <= 20)
      return 'rgba(30, 144, 255, 0.5)'; // royalblue with 50% opacity
    else if (pm10 <= 40)
      return 'rgba(0, 139, 139, 0.5)'; // darkturquoise with 50% opacity
    else if (pm10 <= 80)
      return 'rgba(255, 127, 80, 0.5)'; // coral with 50% opacity
    else return 'rgba(255, 0, 0, 0.5)'; // red with 50% opacity
  }};
  display: grid;
  color: black;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  height: 500px;

  text-align: center;
  line-height: 70px;
  font-size: 30px;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 1500px) {
    width: 80%; /* 브라우저 너비가 768px 이하일 때 카드의 너비를 80%로 설정 */
    font-size: 80%;
  }
`;
const Plus = styled.div`
  position: absolute;
  bottom: 0;
  color: white;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px;
    padding: 0px;
  }
  br {
    margin: 0px;
    padding: 0px;
  }
  font-size: 20px;
`;
const StationName = styled.h2`
  position: absolute;
  top: -6%;
  left: 30%;
  transform: translateX(-10%);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  color: white;
  font-weight: bold;
  font-size: 30px;
`;
const Input = styled.h2`
  position: absolute;
  top: -80px;
  right: 10px;
  transform: scale(2);
`;
const Btn = styled.div`
  position: absolute;
  bottom: 0;
  right: 5%;
  transform: scale(1.4);
`;

const SidoName = styled.p`
  position: absolute;
  top: 0%;
  left: 13%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
`;

const DustLevel = styled.p`
  position: absolute;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  width: 330px;
  color: white;
  font-weight: bold;
  font-size: 25px;
`;
const DataTime = styled.p`
  position: absolute;
  top: 10%;
  left: 50%;
  width: 300px;
  transform: translate(-50%, -50%);
  font-size: 25px;
  color: white;
  font-weight: bold;
`;

export default StationCard;
