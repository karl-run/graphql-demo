import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Spinner from 'react-nano-spinner';

const AnsattRad = ({ ansatt }) => (
  <tr>
    <td>{ansatt.navn}</td>
    <td>{ansatt.sparken ? 'Ja' : 'Nei'}</td>
    <td>{ansatt.lonn.arlig}</td>
    <td>{ansatt.lonn.bonus}</td>
  </tr>
);

const AnsattListe = ({ data }) => {
  if (data.loading) return <Spinner />;

  return (
    <table style={{ width: '500px', margin: '0 auto' }}>
      <thead>
        <tr>
          <th>Navn</th>
          <th>Sparken</th>
          <th>Lønn</th>
          <th>Bonus</th>
        </tr>
      </thead>
      <tbody>
        {data.ansatte.map(ansatt => (
          <AnsattRad key={ansatt.navn} ansatt={ansatt} />
        ))}
      </tbody>
    </table>
  );
};

const withApollo = graphql(gql`
  query {
    ansatte {
      id
      navn
      sparken
      lonn {
        id
        arlig
        bonus
      }
    }
  }
`);

export default withApollo(AnsattListe);
