import React from 'react';
import styled, { css } from 'styled-components';

const Card = styled.div`
  background-image: url(${process.env.PUBLIC_URL}/img/${(props) => {
  const pm10 = parseInt(props.pm10);
  if (pm10 <= 20) return '좋음.jpg';
  else if (pm10 <= 40) return '보통.jpg';
  else if (pm10 <= 80) return '나쁨.jpg';
  else if (pm10 <= 150) return '최악.jpg';
  else return;
}});
  background-size: 100% 70%; /* 이미지의 가로 크기를 카드의 절반으로 설정 */
  background-position: center;
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
  @media screen and (max-width: 768px) {
    width: 80%; /* 브라우저 너비가 768px 이하일 때 카드의 너비를 80%로 설정 */
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
  top: -70px;
  left: 89%;
  transform: translateX(-10%);
  transform: scale(2);
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
  bottom: -10px;
  left: 45%;
  transform: translateX(-50%);
  width: 330px;
  color: white;
  font-weight: bold;
`;
const DataTime = styled.p`
  position: absolute;
  top: 7%;
  left: 50%;
  width: 300px;
  transform: translate(-50%, -50%);
  font-size: 25px;
  color: white;
  font-weight: bold;
`;

function StationCard({ item, isChecked, handleCheck }) {
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
    </Card>
  );
}

export default StationCard;
