import { Button, Flex, Tabs, Typography } from 'antd';
import './App.css';
import { useEffect, useState } from 'react';
import { Container, IMG } from './App.styled';
import Entity from './components/Entity';
import BadgeModal from './components/BadgeModal';

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
  const [badges, setBadges] = useState([]);
  const [pointHistory, setPointHistory] = useState([]);

  useEffect(() => {
    getProfile();
    getEntities();
    getRank();
    getPointHistory();
    getBadges();
  }, []);

  const items = [
    {
      label: "Membership",
      key: 1,
      children: "No Membership available",
      disabled: true
    },
    {
      label: "Badges",
      key: 2,
      children: <Flex wrap='wrap' gap="large">
        {badges.map((badge) => (
          <BadgeModal key={badge._id} badge={badge} />
        ))}
      </Flex>
    },
    {
      label: "Point History",
      key: 3,
      children: <Flex wrap='wrap' gap="large">
        {pointHistory.map((ph) => (
          <Button key={ph._id}>{ph.title}</Button>
        ))}
      </Flex>
    }
  ];

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

  const getPointHistory = async () => {
    try {
      let res = await fetch(`https://staging.questprotocol.xyz/api/entities/${entityId}/users/${userId}/xp-history`, options);
      let response = await res.json();
      setPointHistory(response.data)
    } catch (err) {
      console.log(err);
    }
  };

  const getBadges = async () => {
    try {
      let res = await fetch(`https://staging.questprotocol.xyz/api/entities/${entityId}/users/${userId}/badges`, options);
      let response = await res.json();
      setBadges(response.data);
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
        <Tabs
          defaultActiveKey="2"
          size='large'
          centered
          items={items}
          style={{ marginTop: "7%"}}
        />
      </Container>
    </div>
  );
}

export default App;
