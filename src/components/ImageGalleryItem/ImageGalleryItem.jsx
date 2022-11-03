import PropTypes from 'prop-types';
import { Item, ItemImg } from './ImageGalleryItem.styled.js';

export const ImageGalleryItem = ({
  image: { id, smallImageURL, tag },
  onClick,
}) => {
  return (
    <Item className="gallery-item" onClick={() => onClick(id)}>
      <ItemImg src={smallImageURL} alt={tag} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    tag: PropTypes.string,
    smallImageURL: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};
