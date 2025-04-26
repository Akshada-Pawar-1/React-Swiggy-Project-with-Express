import { addItem, removeItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";

const MenuItem = ({ itemCards }) => {
  const dispatch = useDispatch();

  // Subscribing to the store using Selector
  const cartItems = useSelector((store) => store.cart.items);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const getItemQuantity = (id) => {
    // console.log(cartItems);
    const cartItem = cartItems.filter(
      (cartItem) => cartItem?.card?.info?.id === id
    );
    return cartItem.length;
  };

  return (
    <div className="accordion-body">
      {itemCards.map((item) => {
        const imageId = item?.card?.info?.imageId;
        const imageDescription = item?.card?.info?.description;
        const imageUrl = imageId ? `${CDN_URL}${imageId}` : null;
        // console.log(imageUrl);
        const id = item?.card?.info?.id;
        const itemQuantity = getItemQuantity(id);

        return (
          <div className="menu-container" data-testid="resMenu" key={id}>
            <div className="menu-info">
              <span className="menu-title">{item?.card?.info?.name}</span>
              <span className="menu-price">
                ₹
                {item?.card?.info?.price / 100 ||
                  item?.card?.info?.defaultPrice / 100}
              </span>
              <p className="menu-description">{imageDescription}</p>
            </div>
            {/* Image-Button container */}
            <div
              className="img-btn-container"
              style={{
                alignItems: imageId ? "end" : "center",
              }}
            >
              {/* Image container */}
              <div
                className="img-container"
                style={{ display: imageId ? "block" : "none" }}
              >
                <img className="menu-img" alt="Menu Image" src={imageUrl} />
              </div>
              {/* Button container */}
              <div
                className="btn-container"
                style={{
                  position: imageId ? "absolute" : "relative",
                }}
              >
                <button
                  className="count-btn"
                  onClick={() => handleRemoveItem(id)}
                >
                  ➖
                </button>
                <p>{itemQuantity || 0}</p>
                <button
                  className="count-btn"
                  onClick={() => handleAddItem(item)}
                >
                  ➕
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuItem;
