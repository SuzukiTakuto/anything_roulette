import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  options: string[];
}

const Roulette: React.FC<Props> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const spin = () => {
    const randomIndex = Math.floor(Math.random() * options.length);
    setSelectedOption(options[randomIndex]);
  };

  return (
    <RouletteContainer>
      <RouletteDiscContainer>
        <RouletteButton onClick={spin}>クリック</RouletteButton>
      </RouletteDiscContainer>
      {selectedOption && <SelectedOption>{selectedOption}</SelectedOption>}
    </RouletteContainer>
  );
};

const RouletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RouletteDiscContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

interface RouletteDiscProps {
  itemCount: number;
  selectedOptionIndex: number;
}

const RouletteDisc = styled.div<RouletteDiscProps>`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #222;
  overflow: hidden;
  transition: transform 2s ease-in-out;

  transform: rotate(${(props) => -360 / props.itemCount / 2}deg) // initial rotation
    rotate(${(props) => 360 / props.itemCount / 2}deg) // adjust for initial rotation
    rotate(
      ${(props) => -360 / props.itemCount}deg * ${(props) => props.selectedOptionIndex}
    ); // selected option rotation
`;

const RouletteOption = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
`;

const RouletteButton = styled.button`
  padding: 10px 20px;
  font-size: 24px;
  font-weight: bold;
  border-radius: 4px;
  background-color: #222;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #444;
  }
`;

const SelectedOption = styled.div`
  font-size: 36px;
  font-weight: bold;
`;

export default Roulette;
