import { displayActionMessage } from 'helpers/utils';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket as dispatchAddToBasket, removeFromBasket } from 'redux/actions/basketActions';

const useBasket = () => {
  const { basket } = useSelector((state) => ({ basket: state.basket }));
  const dispatch = useDispatch();

  const isItemOnBasket = (id) => !!basket.find((item) => item.id === id);

  const addToBasket = (product) => {
    if (isItemOnBasket(product.id)) {
      dispatch(removeFromBasket(product.id));
      // console.log('Item removed from basket');
      displayActionMessage('Item removed from basket', 'info');
    } else {
      dispatch(dispatchAddToBasket(product));
      // console.log('Item added to basket');
      displayActionMessage('Item added to basket', 'success');
    }
  };

  return { basket, isItemOnBasket, addToBasket };
};

export default useBasket;
