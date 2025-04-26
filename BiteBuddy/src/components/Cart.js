import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import MenuItem from "./MenuItem";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  // console.log(cartItems);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const placeOrder = () => {
    alert("Your order placed successfully!!");
  };

  const itemSet = Array.from(new Set(cartItems));
  // console.log(itemSet);

  return (
    <div>
      <h2 className="cart-header">Cart</h2>
      <div className="cart-button-positions">
        {cartItems.length > 0 && (
          <div>
            <button className="common-btn" onClick={handleClearCart}>
              Clear Cart
            </button>
            <button className="common-btn" onClick={placeOrder}>
              Order
            </button>
          </div>
        )}
      </div>
      {cartItems.length === 0 && (
        <h3 className="msg-display">Please add something in Cart!!</h3>
      )}
      <div className="accordion-menu">
        <MenuItem itemCards={itemSet} />
      </div>
    </div>
  );
};

export default Cart;
