import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';

const Home = () => {
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://quiz-react-sanber.vercel.app/api/mobile-apps');
        setGames(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Find your data that you need!</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {games && games.map(game => <Card key={game.id} game={game} />)}
        </div>
      )}
    </div>
  );
};

export default Home;