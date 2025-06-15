import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [temperature, setTemperature] = useState(null); //현재 온도(temperature)와 습도(humidity) 값을 저장할 **변수(state)**를 만들어요
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://192.168.123.37/data');  // ESP32에서 JSON 데이터를 가져와요.
        const data = await res.json();
        setTemperature(data.temperature);
        setHumidity(data.humidity);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // 이 줄 덕분에 5초마다 자동으로 새로고침 없이 센서 데이터 갱신돼요.
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>🌡️ 온습도 모니터링</h1>
      <div className="sensor-container">
        <div className="sensor-item">
          <img src="/temp-icon.png" alt="온도 아이콘" />
          <span>{temperature !== null ? `${temperature} ℃` : '로딩 중...'}</span>  //온도와 습도를 화면에 보기 좋게 보여줘요.
        </div>
        <div className="sensor-item">
          <img src="/hum-icon.png" alt="습도 아이콘" />
          <span>{humidity !== null ? `${humidity} %` : '로딩 중...'}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
