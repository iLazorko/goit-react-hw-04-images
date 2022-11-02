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
