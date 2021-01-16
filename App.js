import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import styled from 'styled-components';
import MainContainer from './MainContainer';

const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'production' ? 'https://wx-weeny.herokuapp.com/' : 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

export const Root = styled.div`
  align-items: center;
  background-color: blanchedalmond;
  display: flex;
  height: 100%;
  font-family: 'Verdana';
  justify-content: center;

  a {
    color: #89d587;
  }

  b {
    font-weight: normal;
  }

  @media only screen and (min-width: 440px) {
    & > div > div, & > div > div > div {
      border-radius: 20px;
    }
  }
`

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Root>
        <MainContainer />
      </Root>
    </ApolloProvider>
  )
}