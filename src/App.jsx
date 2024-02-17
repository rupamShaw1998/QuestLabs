import { Flex, Typography } from 'antd';
import './App.css';
import { useEffect, useState } from 'react';
import { Container, IMG } from './App.styled';
import Entity from './components/Entity';

const { Title } = Typography;

const userId = "u-a2399489-9cd0-4c94-ad12-568379202b08";
const entityId = "e-0000000000";
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    apikey: 'k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be',
    userid: 'u-a2399489-9cd0-4c94-ad12-568379202b08',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWEyMzk5NDg5LTljZDAtNGM5NC1hZDEyLTU2ODM3OTIwMmIwOCIsImlhdCI6MTcwNzk4NzYyOSwiZXhwIjoxNzA4NTkyNDI5fQ.fESDqKunAqLUgHBCUsNYpGcNrTeVEty91HqGebX59Uc'
  }
};

function App() {

  const [profile, setProfile] = useState({});
  const [entities, setEntities] = useState({});

  useEffect(() => {
    getProfile();
    getEntities();
    getRank();
  }, []);

  const getProfile = async () => {
    try {
      let res = await fetch(`https://staging.questprotocol.xyz/api/users/${userId}`, options);
      let response = await res.json();
      let { data: { imageUrl, name }} = response;
      setProfile({ imageUrl, name });
    } catch (err) {
      console.log(err);
    }
  };

  const getEntities = async () => {
    try {
      let res = await fetch(`https://staging.questprotocol.xyz/api/entities/${entityId}/users/${userId}/xp`, options);
      let response = await res.json();
      let { data, tier } = response;
      setEntities((prev) => ({ ...prev, data, tier }));
    } catch (err) {
      console.log(err);
    }
  };

  const getRank = async () => {
    try {
      let res = await fetch(`https://staging.questprotocol.xyz/api/entities/${entityId}/users/${userId}/xp-leaderboard-rank`, options);
      let response = await res.json();
      let { data: { position } } = response;
      setEntities((prev) => ({ ...prev, position}));
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
        <Flex justify='space-evenly'>
          <Entity value={entities.data} text={"Points"} />
          <Entity value={`#${entities.position}`} text={"Rank"} />
          <Entity value={entities.tier} text={"Level"} />
        </Flex>
      </Container>
    </div>
  );
}

export default App;
