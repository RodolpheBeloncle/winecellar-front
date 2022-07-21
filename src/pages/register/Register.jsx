import React, { useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../../responsive';
import { publicRequest } from '../../utils/api';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';

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
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-size: 1.7rem;
  font-weight: 300;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 1.2rem 0.7rem 0rem 0rem;
  padding: 0.7rem;
  border-radius: 2rem;
  border: solid 1px #dcc1a8;
`;

const Agreement = styled.span`
  font-size: 1rem;
  margin: 1.4rem 0rem;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 1rem 1.2rem;
  background-color: #dcc1a8;
  border-radius: 2rem;
  color: white;
  cursor: pointer;
  ${mobile({ marginLeft: '5rem' })}
`;

const LinkTo = styled.a`
  display: flex;
  flex-direction: row;
  margin: 0.3rem 0rem;
  font-size: 1rem;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 50px;
`;

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const onLogin = () => {
    navigate('/');
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validateOnChange: false,
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password !== values.confirmPassword) {
        errors.password = 'confirmed password is different';
      }
      setError(errors);
      return errors;
    },
    onSubmit: (values) => {
      publicRequest
        .post(`auth/register`, values)
        .then((response) => {
          console.log(response.data.message);
          onLogin()
        })
        .catch((error) => {
          setError(true);

          // console.log("Object keys",Object.entries(error.response.data[1]));
          // setMessageError(Object.entries(error.response.data[1]));
        });
    },
  });


  return (
    <Container>
      <Wrapper>
        <Title>Create new user account</Title>
        <Form onSubmit={formik.handleSubmit}>
          <span>
            {formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}
          </span>

          <Input
            id="username"
            name="username"
            type="username"
            placeholder="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />

          <span>
            {formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </span>

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <span>
            {formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </span>

          <Input
            placeholder="password"
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Input
            placeholder="confirm password"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          <Agreement>
            By creating an account, I consent to the processing of my data
            personal data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>Create</Button>
          {error && (
            <>
              <br />
              <span style={{ color: 'red' }}>{messageError}</span>
              <br />
            </>
          )}

          <LinkTo>
            <Link className="link" to="/login">
              <LoginIcon />
              <br />
              Back to login page
            </Link>
          </LinkTo>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
