/* eslint-disable react/jsx-filename-extension */
// == Import npm
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Columns, Content, Container, Heading } from 'react-bulma-components';

// == Import
import Filter from './filter';
import Results from './results';

// == Composant
const Search = () => {
  const [activePage, setActivePage] = useState(1);

  return (
    <Columns>
      <Columns.Column>
        <Columns>
          <Container>
            <Content>
              <Heading size={3}>Trouvez le mate qu'il vous faut !</Heading>
            </Content>
          </Container>
        </Columns>
        <Columns.Column />

        <Columns gapless>
          <Filter setActivePage={setActivePage} />
        </Columns>
        <Columns>
          <Columns.Column />
        </Columns>
        <Results activePage={activePage} setActivePage={setActivePage} />
      </Columns.Column>
    </Columns>
  );
};

// == Export
export default Search;
