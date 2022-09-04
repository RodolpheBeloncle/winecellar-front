import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { desktop } from '../../responsive';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/apiCalls';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.3)
    ),
    url('https://empire-s3-production.bobvila.com/slides/44685/vertical_slide_wide/stunning_wine_cellars_arched.jpg?1640707520')
      center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${desktop({ height: '100vh' })}
`;

const Wrapper = styled.div`
  width: 18rem;
  height: 30rem;
  padding: 1.25rem;
  margin-bottom: 5rem;
  background-color: white;
  border-radius: 2rem;
  ${desktop({ width: '25rem', marginBottom: '0rem', height: '25rem' })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 360px;
  padding: 0.5rem;
`;

const Title = styled.h1`
  font-size: 1.7rem;
  font-weight: 300;
  text-align: center;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  width: 15rem;
  margin: 1rem 0.7rem 0rem 0rem;
  padding: 0.7rem;
  border-radius: 2rem;
  border: solid 1px #dcc1a8;
  text-align: center;
  &::placeholder {
    text-align: center;
  }
  ${desktop({ width: '20rem' })}
`;

const DisplayPassword = styled.div``;

const Button = styled.button`
  width: 40%;
  border: none;
  margin-top: 1rem;
  padding: 1rem 1.2rem;
  background-color: #dcc1a8;
  border-radius: 2rem;
  color: white;
  cursor: pointer;
  margin-bottom: 0.8rem;
  &:disabled {
    color: #dcc1a8;
    cursor: not-allowed;
  }
  ${desktop({ margin: '1rem ', width: '20rem' })}
`;

const ErrorYup = styled.p`
  color: tomato;
  text-align: center;
  font-size: 0.9rem;
  &::before {
    display: inline;
    content: '⚠';
  }
  ${desktop({ fontSize: '1.1rem' })}
`;
const LinkTo = styled.p`
  margin: 0.3rem 0rem;
  font-size: 1rem;
  text-decoration: underline;
  cursor: pointer;
`;
const Agreement = styled.span`
  font-size: 0.8rem;
  text-align: center;
`;

const Error = styled.span`
  color: red;
  margin-bottom: 1rem;
`;

const Login = () => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.user.currentUser);
  const userError = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  const schema = yup
    .object({
      email: yup
        .string()
        .email('please set valid email')
        .max(255)
        .required('please set valid email'),
      password: yup.string().max(255).required('please set your password'),
    })
    .required();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = (values) => {
    const { email, password } = values;

    login(dispatch, {
      email: email,
      password: password,
    }).then(() => {
      console.log('test response', userError);
    });
  };

  const handleCheckPassword = () => setChecked(!checked);

  useEffect(() => {
    if (userAuth) {
      navigate('/');
    }
  }, [userAuth, navigate]);

  return (
    <Container>
      <Wrapper>
        <Title>Connexion</Title>
        <Form onSubmit={handleSubmit(handleLogin)}>
          <FormContainer>
            {errors.email && <ErrorYup>{errors.email.message}</ErrorYup>}
            <Label>
              {' '}
              <Input type="email" placeholder="email" {...register('email')} />
            </Label>
          </FormContainer>
          <FormContainer>
            {errors.password && <ErrorYup>{errors.password.message}</ErrorYup>}
            <Label>
              {' '}
              <Input
                placeholder="password"
                type={checked ? 'text' : 'password'}
                {...register('password')}
              />
            </Label>
          </FormContainer>
          <DisplayPassword>
            <Label>
              {' '}
              Show password
              <Input
                checked={checked}
                onChange={handleCheckPassword}
                type="checkbox"
              />
            </Label>
          </DisplayPassword>
          <Button>Login</Button>
          {userError.message === {} ? '' : <Error>{userError.message}</Error>}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <LinkTo>
            <Link className="link" to="/register">
              Create new Account
            </Link>
          </LinkTo>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
