import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Spinner from 'react-nano-spinner';

const AnsattRad = ({ ansatt, mutate }) => {
  return (
    <tr>
      <td>{ansatt.navn}</td>
      <td>{ansatt.sparken ? 'Ja' : 'Nei'}</td>
      <td>
        <button
          onClick={() => mutate({ variables: { hvem: ansatt.navn } })}
          disabled={ansatt.sparken}
        >
          Spark
        </button>
      </td>
    </tr>
  );
};

const AnsattRadMedSparking = graphql(gql`
  mutation spark($hvem: String!) {
    spark(navn: $hvem) {
      id
      navn
      sparken
    }
  }
`)(AnsattRad);

const AnsattListe = ({ data }) => {
  if (data.loading) return <Spinner />;

  return (
    <table style={{ width: '500px', margin: '0 auto' }}>
      <thead>
        <tr>
          <th>Navn</th>
          <th>Sparken</th>
          <th>Spark</th>
        </tr>
      </thead>
      <tbody>
        {data.ansatte.map(ansatt => (
          <AnsattRadMedSparking key={ansatt.navn} ansatt={ansatt} />
        ))}
      </tbody>
    </table>
  );
};

const withApollo = graphql(gql`
  query ansatte {
    ansatte {
      id
      navn
      sparken
    }
  }
`);

export default withApollo(AnsattListe);
