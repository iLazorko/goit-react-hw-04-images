import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Header, Form, SearchButton, Input } from './Searchbar.styled.js';

export const Searchbar = ({ searchValue, updateStateQuery }) => {
  const [inputValue, setInputValue] = useState('');

  const onChange = evt => {
    setInputValue(evt.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (inputValue === '') {
      return;
    }

    if (inputValue === searchValue) {
      setInputValue('');
      return;
    }

    updateStateQuery(inputValue);
    setInputValue('');
  };

  return (
    <Header>
      <Form onSubmit={onSubmit} autoComplete="off">
        <SearchButton type="submit">
          <FaSearch />
        </SearchButton>
        <Input
          type="text"
          placeholder="Search images and photos"
          onChange={onChange}
          value={inputValue}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  updateStateQuery: PropTypes.func.isRequired,
};
