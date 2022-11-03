import PropTypes from 'prop-types';
import { LoadMoreBtn } from './Button.styled.js';

export const Button = ({ moreImages }) => {
  return (
    <LoadMoreBtn type="button" onClick={moreImages}>
      Load more
    </LoadMoreBtn>
  );
};

Button.propTypes = {
  moreImages: PropTypes.func.isRequired,
};
