import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const AnsattInput = ({ lagreNyAnsatt }) => (
  <div>
    <span>Ny ansatt: </span>
    <input
      type="text"
      onKeyUp={event => {
        if (event.keyCode === 13) {
          lagreNyAnsatt(event.target.value);
        }
      }}
    />
  </div>
);

const withApollo = graphql(
  gql`
    mutation ansett($hvem: String!) {
      nyAnsatt(navn: $hvem) {
        id
        navn
        sparken
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      lagreNyAnsatt: navn => mutate({ variables: { hvem: navn } }),
    }),
    options: {
      refetchQueries: ['ansatte'],
    },
  },
);

export default withApollo(AnsattInput);
