import React, { useEffect, useState } from 'react';
import { Roulette } from '../type';
import { useLocation } from 'react-router-dom';
import MainRoulette from '../components/MainRoulette';

export const RoulettePage = () => {
  const [rouletteData, setRouletteData] = useState<Roulette>();
  const location = useLocation();
  useEffect(() => {
    console.log(location);
    if (location) {
      setRouletteData(location.state);
      console.log(location.state);
    }
  }, []);
  return (
    <>
      <h1>{rouletteData?.title}</h1>
      {rouletteData && <MainRoulette options={rouletteData?.items as string[]} />}
    </>
  );
};
