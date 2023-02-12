import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { Input, Form, Container } from '../components/compoents';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

type ValuesType = {
  email: string;
  password: string;
};

export const Signup = () => {
  const { register, watch, handleSubmit, formState } = useForm<ValuesType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [user, setUser] = useState<User | null>();

  const handleOnSubmit: SubmitHandler<ValuesType> = async (values) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {
      alert(error);
    }
  };

  const handleOnError: SubmitErrorHandler<ValuesType> = (errors) => {
    console.log(errors);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <Container>
      {user ? (
        <Navigate to={'/select'} />
      ) : (
        <Form onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
          <Input>
            <label htmlFor="email">Email</label>
            {!!formState.errors.email && <p>{formState.errors.email.message}</p>}
            <input
              id="email"
              type="text"
              {...register('email', {
                required: '* this is required filed',
              })}
            />
          </Input>

          <Input>
            <label htmlFor="password">Password</label>
            {!!formState.errors.password && <p>{formState.errors.password.message}</p>}
            <input
              id="password"
              type="password"
              {...register('password', {
                required: '* this is required filed',
              })}
            />
          </Input>

          <button type="submit">登録</button>
        </Form>
      )}
    </Container>
  );
};
