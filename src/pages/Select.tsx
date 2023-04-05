import React, { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, getDocs, setDoc, addDoc, doc } from 'firebase/firestore';
import { Container } from '../components/compoents';
import { Roulette } from '../type';

export const Select = () => {
  const [user, setUser] = useState<User | null>();
  const [rouletteData, setRouletteData] = useState<Roulette[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      const getRoulette = async () => {
        const querySnapshot = await getDocs(collection(db, 'roulettes'));
        querySnapshot.forEach((doc) => {
          if (doc.id === currentUser?.uid) {
            setRouletteData(doc.data().rouletteSets);
            //console.log(preRouletteData);
          }
        });
      };

      getRoulette();
    });
  }, []);

  return (
    <Container>
      <ul style={{ width: '100px', margin: 'auto' }}>
        {rouletteData.map((item, i) => (
          <li key={i} style={{ textAlign: 'left' }}>
            <button type="button">{item.title}</button>
          </li>
        ))}
      </ul>
    </Container>
  );
};
