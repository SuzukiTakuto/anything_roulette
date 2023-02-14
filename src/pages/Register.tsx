import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { RouletteTitle, Form } from '../components/compoents';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { RouletteOfUser } from '../type';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [rouletteItems, setRouletteItems] = useState<String[]>([]);
  const [rouletteTitle, setRouletteTitle] = useState<
    string | number | readonly string[] | undefined
  >('名称未設定');
  const [user, setUser] = useState<User | null>();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const rouletteData: RouletteOfUser = {
    email: '',
    rouletteSets: [
      {
        items: [''],
        title: '',
      },
    ],
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) rouletteData.email = currentUser?.email;
    });
  }, []);

  const test = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (value) => {
    const newTitle = value.target.value;
    setRouletteTitle(newTitle);
  };

  const addItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      setRouletteItems([...rouletteItems, inputRef.current.value]);
      inputRef.current.value = '';
    }
  };

  const handleRegister = () => {
    rouletteData.rouletteSets.push({ items: rouletteItems, title: rouletteTitle });

    navigate('/roulette');
  };

  return (
    <>
      <RouletteTitle type="text" defaultValue={rouletteTitle} onChange={handleChange} />
      <ul style={{ width: '100px', margin: 'auto' }}>
        {rouletteItems.map((item, i) => (
          <li key={i} style={{ textAlign: 'left' }}>
            {item}
          </li>
        ))}
      </ul>

      <Form style={{ margin: 'auto' }} onSubmit={addItem}>
        <input style={{ margin: '10px' }} type="text" ref={inputRef} />
        <button type="submit">追加</button>
      </Form>

      <button type="button">登録</button>
    </>
  );
};
