import React, { useMemo } from 'react';
import { ApolloClient, InMemoryCache, getApolloContext } from '@apollo/client';
import styled from 'styled-components';
import MainContainer from './MainContainer';

const CustomApolloProvider = ({ client, children }) => {
  const ApolloContext = getApolloContext();
  const value = useMemo(() => ({ client }), [client]);
  return <ApolloContext.Provider value={value}>{children}</ApolloContext.Provider>;
};

const url = 'https://wx-weeny.herokuapp.com/graphql'
const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'production' ? proxyurl + url : 'http://localhost:4000/graphql',
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
    <Root>
      <CustomApolloProvider client={client} children={<MainContainer />} />
    </Root>
  )
}