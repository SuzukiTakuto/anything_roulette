import React from 'react';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { Input, Form, Container, ButtonWrapper } from '../components/compoents';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

type ValuesType = {
  email: string;
  password: string;
};

export const Signin = () => {
  const { register, watch, handleSubmit, formState } = useForm<ValuesType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigate = useNavigate();

  const handleOnSubmit: SubmitHandler<ValuesType> = async (values) => {
    console.log(values);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      if (userCredential.user) {
        navigate('/select');
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleOnError: SubmitErrorHandler<ValuesType> = (errors) => {
    console.log(errors);
  };

  return (
    <Container>
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

        <ButtonWrapper>
          <button type="submit">ログイン</button>
          <button onClick={() => navigate('/signup')}>新規登録ページへ</button>
        </ButtonWrapper>
      </Form>
    </Container>
  );
};
