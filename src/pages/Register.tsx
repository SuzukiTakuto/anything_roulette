import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { RouletteTitle, Form } from '../components/compoents';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, getDocs, setDoc, addDoc, doc } from 'firebase/firestore';
import { Roulette } from '../type';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [rouletteItems, setRouletteItems] = useState<String[]>([]);
  const [rouletteTitle, setRouletteTitle] = useState<
    string | number | readonly string[] | undefined
  >('名称未設定');
  const [user, setUser] = useState<User | null>();
  const [rouletteData, setRouletteData] = useState<Roulette[]>([]);
  const [preRouletteData, setPreRouletteData] = useState<Roulette[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      const getRoulette = async () => {
        const querySnapshot = await getDocs(collection(db, 'roulettes'));
        querySnapshot.forEach((doc) => {
          if (doc.id === currentUser?.uid) {
            setPreRouletteData(doc.data().rouletteSets);
            //console.log(preRouletteData);
          }
        });
      };

      getRoulette();
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
    if (inputRef.current && inputRef.current.value !== '') {
      console.log(inputRef.current.value);
      // 空の文字列でない場合のみ追加
      setRouletteItems([...rouletteItems, inputRef.current?.value as String]);
      console.log(rouletteItems);
      inputRef.current.value = '';
    }
  };

  const handleRegister = async () => {
    const newRouletteData = [...preRouletteData, { items: rouletteItems, title: rouletteTitle }];
    console.log(newRouletteData);
    setRouletteData(newRouletteData);
  };

  // rouletteDataの値が更新されたら実行
  useEffect(() => {
    console.log(rouletteData);
    const sendData = async () => {
      try {
        if (user?.uid) {
          // コレクション名'roulettes'のドキュメント名がuser.uidのドキュメントのフィールドにrouletteDataを追加
          await setDoc(
            doc(db, 'roulettes', user?.uid),
            { rouletteSets: rouletteData },
            { merge: true }
          );
          navigate('/select');
        }
      } catch (error) {
        console.log(error);
      }
    };
    sendData();
  }, [rouletteData]);

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

      <button type="button" onClick={handleRegister}>
        登録
      </button>
    </>
  );
};
