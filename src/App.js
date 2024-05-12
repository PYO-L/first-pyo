import React, { useEffect, useState } from 'react';
import './App.css';
import StationCard from './component/StationCard';

function App() {
  const [items, setItems] = useState(null);
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [userRegion, setUserRegion] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // 페이지 로드될 때 로컬 스토리지에서 즐겨찾기 목록을 가져옴
    const storedBookmarks = localStorage.getItem('즐찾');
    if (storedBookmarks) {
      // 가져온 즐겨찾기 목록을 배열로 변환하여 상태에 설정
      setBookmarks(storedBookmarks.split(','));
    }
    const url =
      'https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?&pageNo=1&numOfRows=660&returnType=json&serviceKey=8wWLfXObISLCK%2FaVpgCfT%2BquX4TV%2B5Zq6yrf6je%2BFP0qSHdgP7qNQmYs3PZ0yuDGw09sW6%2FRgq%2BwwrW%2FBtM5kw%3D%3D&ver=1.0&sidoName=%EC%A0%84%EA%B5%AD';
    // 데이터 가져오는 부분
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setItems(data.response.body.items);
        setFilteredItems(data.response.body.items);
      });
  }, []);

  const handleCheck = (item) => (e) => {
    const isChecked = e.target.checked;
    const stationName = item.stationName;

    // 체크박스가 체크되면 해당 항목을 즐겨찾기에 추가
    if (isChecked) {
      const newBookmarks = [...bookmarks, stationName];
      setBookmarks(newBookmarks);
      localStorage.setItem('즐찾', newBookmarks.join(','));
    } else {
      // 체크박스가 체크 해제되면 해당 항목을 즐겨찾기에서 제거
      const newBookmarks = bookmarks.filter(
        (bookmark) => bookmark !== stationName
      );
      setBookmarks(newBookmarks);
      localStorage.setItem('즐찾', newBookmarks.join(','));
    }
  };

  const handleBookmarkClick = () => {
    setShowBookmarks(!showBookmarks);
  };

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setUserRegion(region);
    // 입력한 지역에 해당하는 측정소만 필터링
    if (region === '') {
      setFilteredItems(items); // 모든 항목을 표시
    } else {
      setFilteredItems(items.filter((item) => item.sidoName === region));
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={userRegion}
          onChange={handleRegionChange}
          placeholder="지역을 입력하세요"
        />
        <span>. .</span>
        <button className="bookmark" onClick={handleBookmarkClick}>
          <img
            src={process.env.PUBLIC_URL + '/img/북마크.png'}
            alt="북마크 아이콘"
            style={{ width: '15px', height: '15px', backgroundColor: 'white' }}
          />
        </button>
      </div>
      <div className="card-container">
        {filteredItems &&
          filteredItems.map((item) => (
            <div
              key={item.stationName}
              className="card-item"
              style={{
                display:
                  showBookmarks || bookmarks.includes(item.stationName)
                    ? 'block'
                    : 'none',
              }}
            >
              <StationCard
                key={item.stationName}
                item={item}
                isChecked={bookmarks.includes(item.stationName)}
                handleCheck={handleCheck(item)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
