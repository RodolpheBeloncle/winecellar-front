import React, { useState } from 'react';
import styled from 'styled-components';
import { desktop, mobile } from '../../responsive';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { publicRequest } from '../../utils/api';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://tahoequarterly.com/wp-content/uploads/2021/02/Wine-room-1.jpg')
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 1.25rem;
  background-color: white;
  border-radius: 2rem;
  ${mobile({ width: '75%' })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 1.7rem;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  text-align: center;
  margin: 1.2rem 0.7rem 0rem 0rem;
  padding: 0.7rem;
  border-radius: 2rem;
  border: solid 1px #dcc1a8;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 360px;
  padding: 0.5rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DisplayPassword = styled.div``;

const Agreement = styled.span`
  font-size: 0.8rem;
  margin: 1.4rem 0rem;
  text-align: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  ${desktop({ margin: '1rem ', width: '20rem' })}
  ${mobile({ marginRight: '5rem' })}
`;

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 1rem 1.2rem;
  background-color: #dcc1a8;
  border-radius: 2rem;
  color: white;
  cursor: pointer;
  margin-left: 1rem;
  ${mobile({ marginLeft: '5rem' })}
`;

const LinkTo = styled.p`
  width: 50%;
  text-align: center;
  text-decoration: none;
  color: white;
  font-size: 0.8rem;
  border: none;
  padding: 1rem 1.2rem;
  background-color: #dcc1a8;
  border-radius: 2rem;
  color: white;
  cursor: pointer;
  margin-left: 1rem;
  ${mobile({ marginLeft: '5rem' })}
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

const Register = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState('');

  // initialize yup regarding inputs fields
  const schema = yup
    .object({
      username: yup.string().max(50).required('Please set your username'),
      email: yup
        .string()
        .email('Please set your email')
        .max(255)
        .required('Please set your email'),
      password: yup.string().max(255).required('Please set your password'),
      controlpassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Password should be identical'),
    })
    .required();

    // apply yup schema to yup useform
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // initialize onSubmit function to send data on register
  const onSubmit = async (values) => {
    const { username, email, password, controlpassword } = values;
    try {
      publicRequest.post(`auth/register`, {
        username: username,
        email: email,
        password: password,
        confirmPassword: controlpassword,
      });

      return navigate('/login');
    } catch (err) {
      setError(err.response.data);
      console.log(err.response.data);
    }
  };

  const handleChange = () => setChecked(!checked);
  const onCancel = () => navigate('/login');

  return (
    <Container>
      <Wrapper>
        <Title>Register</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContainer>
            {errors.username && <ErrorYup>{errors.username.message}</ErrorYup>}
            <Label>
              {' '}
              <Input
                type="text"
                placeholder="Username"
                name="username"
                {...register('username')}
              />
            </Label>
          </FormContainer>

          <FormContainer>
            {errors.email && <ErrorYup>{errors.email.message}</ErrorYup>}
            <Label>
              {' '}
              <Input
                type="text"
                name="email"
                placeholder="Email"
                {...register('email')}
              />
            </Label>
          </FormContainer>

          <FormContainer>
            {errors.password && <ErrorYup>{errors.password.message}</ErrorYup>}
            <Label>
              {' '}
              <Input
                name="password"
                placeholder="Password"
                type={checked ? 'text' : 'password'}
                {...register('password')}
              />
            </Label>
          </FormContainer>

          <FormContainer>
            {errors.controlpassword && (
              <ErrorYup>{errors.controlpassword.message}</ErrorYup>
            )}
            <Label>
              {' '}
              <Input
                type={checked ? 'text' : 'password'}
                {...register('controlpassword')}
                placeholder="Confirm password"
              />
            </Label>
            <DisplayPassword>
              <Label style={{ paddingTop: '10px' }}>
                {' '}
                Show Password
                <Input
                  checked={checked}
                  onChange={handleChange}
                  type="checkbox"
                />
              </Label>
            </DisplayPassword>
          </FormContainer>

          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <ButtonContainer>
            <Button>Register</Button>
            <LinkTo onClick={onCancel}>Login</LinkTo>
          </ButtonContainer>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
