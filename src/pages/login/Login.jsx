import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { login } from '../../redux/apiCalls';
import { mobile } from '../../responsive';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://empire-s3-production.bobvila.com/slides/44685/vertical_slide_wide/stunning_wine_cellars_arched.jpg?1640707520')
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 1.25rem;
  background-color: white;
  border-radius: 2rem;
  ${mobile({ width: '75%' })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 1.7rem;
  font-weight: 300;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 0.8rem 0rem;
  padding: 0.7rem;
  border-radius: 2rem;
  border: solid 1px #dcc1a8;
`;

const Button = styled.button`
  width: 40%;
  border: none;
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
`;

const LinkTo = styled.a`
  margin: 0.3rem 0rem;
  font-size: 1rem;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.user.currentUser);
  const errorState = useSelector((state) => state.user.error.message);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
   
  };

  useEffect(() => {
    if (userAuth) {
      navigate('/');
    }
  }, [userAuth, navigate]);

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Form onSubmit={(e) => handleLogin(e)}>
          <Input type="email" placeholder="email" ref={emailRef} />
          <Input type="password" placeholder="password" ref={passwordRef} />
          <>
            <br />
            <span style={{ color: 'red' }}>{errorState}</span>
            <br />
          </>

          <Button type="submit">Connect</Button>
          {/* {error && <Error> Something went wrong </Error>} */}
          <LinkTo>Forgotten password ?</LinkTo>
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
