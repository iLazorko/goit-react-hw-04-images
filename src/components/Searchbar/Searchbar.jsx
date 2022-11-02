import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Header, Form, SearchButton, Input } from './Searchbar.styled.js';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  onChange = evt => {
    this.setState({ inputValue: evt.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { inputValue } = this.state;

    if (inputValue === '') {
      return;
    }

    if (inputValue === this.props.searchValue) {
      this.setState({ inputValue: '' });
      return;
    }

    this.props.updateStateQuery(inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.onSubmit} autoComplete="off">
          <SearchButton type="submit">
            <FaSearch />
          </SearchButton>
          <Input
            type="text"
            placeholder="Search images and photos"
            onChange={this.onChange}
            value={this.state.inputValue}
          />
        </Form>
      </Header>
    );
  }
}
