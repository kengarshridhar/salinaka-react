import { CloseOutlined } from '@ant-design/icons';
import { BasketItemControl } from 'components/basket';
import { ImageLoader } from 'components/common';
import { displayMoney } from 'helpers/utils';
import PropType from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromBasket } from 'redux/actions/basketActions';
import firebase from 'services/firebase';

const BasketItem = ({ product }) => {
  const dispatch = useDispatch();
  // Remove iten in baseket firestore 
  const onRemoveItems = () => firebase.removeBasketItems(product, firebase.auth.currentUser.uid)
  const onRemoveFromBasket = () => dispatch(removeFromBasket(product.id)) && onRemoveItems && console.log(`RemoveID: ${product.id}, name: ${product.name}, brand ${product.brand}`);
  // const onRemoveFirbase = () => console.log(`RemoveID: ${product.id}`);
  
  return (
    <div className="basket-item">
      <BasketItemControl product={product} />
      <div className="basket-item-wrapper">
        <div className="basket-item-img-wrapper">
          <ImageLoader
            src={product.image}
            alt={product.name}
            className="basket-item-img"
          />
        </div>
        <div className="basket-item-details">
          <Link to={`/product/${product.id}`} onClick={() => document.body.classList.remove('is-basket-open')}>
            <h4 className="underline basket-item-name">
              {product.name}
            </h4>
          </Link>
          <div className="basket-item-specs">
            <div>
              <span className="spec-title">Quantity</span>
              <h5 className="my-0">{product.quantity}</h5>
            </div>
            <div>
              <span className="spec-title">Size</span>
              <h5 className="my-0">
                {product.selectedSize}
                {' '}
                mm
              </h5>
            </div>
            <div>
              <span className="spec-title">Color</span>
              <div style={{
                backgroundColor: product.selectedColor || product.availableColors[0],
                width: '15px',
                height: '15px',
                borderRadius: '50%'
              }}
              />
            </div>
          </div>
        </div>
        <div className="basket-item-price">
          <h4 className="my-0">{displayMoney(product.price * product.quantity)}</h4>
        </div>
        <button
          className="basket-item-remove button button-border button-border-gray button-small"
          onClick={onRemoveFromBasket}
          type="button"
        >
          <CloseOutlined />
        </button>
      </div>
    </div>
  );
};

BasketItem.propTypes = {
  product: PropType.shape({
    id: PropType.string,
    name: PropType.string,
    brand: PropType.string,
    price: PropType.number,
    quantity: PropType.number,
    maxQuantity: PropType.number,
    description: PropType.string,
    keywords: PropType.arrayOf(PropType.string),
    selectedSize: PropType.string,
    selectedColor: PropType.string,
    imageCollection: PropType.arrayOf(PropType.object), // change string to object
    sizes: PropType.arrayOf(PropType.string), // change number to string
    image: PropType.string,
    imageUrl: PropType.string,
    isFeatured: PropType.bool,
    isRecommended: PropType.bool,
    availableColors: PropType.arrayOf(PropType.string)
  }).isRequired
};

export default BasketItem;