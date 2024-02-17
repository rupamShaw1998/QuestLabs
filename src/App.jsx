import { Typography } from 'antd';
import './App.css';
import { useEffect, useState } from 'react';
import { Container, IMG } from './App.styled';

const { Title } = Typography;

function App() {

  const [profile, setProfile] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    let userId = "u-a2399489-9cd0-4c94-ad12-568379202b08";
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        apikey: 'k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be',
        userid: 'u-a2399489-9cd0-4c94-ad12-568379202b08',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWEyMzk5NDg5LTljZDAtNGM5NC1hZDEyLTU2ODM3OTIwMmIwOCIsImlhdCI6MTcwNzk4NzYyOSwiZXhwIjoxNzA4NTkyNDI5fQ.fESDqKunAqLUgHBCUsNYpGcNrTeVEty91HqGebX59Uc'
      }
    };
    try {
      let res = await fetch(`https://staging.questprotocol.xyz/api/users/${userId}`, options);
      let response = await res.json();
      let { data: { imageUrl, name }} = response;
      setProfile({ imageUrl, name });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Title style={{ color: "white" }} level={4}>Profile</Title>
      <Container>
        <IMG src={profile.imageUrl} alt="Profile Pic" />
        <Title level={3}>{profile.name}</Title>
      </Container>
    </div>
  );
}

export default App;
