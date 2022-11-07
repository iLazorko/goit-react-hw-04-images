import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Header, Form, SearchButton, Input } from './Searchbar.styled.js';

export const Searchbar = ({ updateStateQuery }) => {
  const onSubmit = e => {
    e.preventDefault();
    const inputValue = e.currentTarget.elements.inputValue.value;

    if (inputValue === '') {
      return;
    }

    updateStateQuery(inputValue);
    e.currentTarget.reset();
  };

  return (
    <Header>
      <Form onSubmit={onSubmit} autoComplete="off">
        <SearchButton type="submit">
          <FaSearch />
        </SearchButton>
        <Input
          type="text"
          name="inputValue"
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  updateStateQuery: PropTypes.func.isRequired,
};
