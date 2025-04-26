import { useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import MenuCategory from "./MenuCategory";

const ResMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(0);

  if (resInfo === null) return <Shimmer />;

  const { name, avgRating, costForTwoMessage, cuisines, id } =
    resInfo?.cards[2]?.card?.card?.info || {};

  // const itemCards =
  //   resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

  // console.log(itemCards);
  // console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  // console.log(categories);

  const handleToggle = (index) => {
    setShowIndex(showIndex === index ? null : index);
  };

  return (
    <div className="res-menu">
      <div className="res-header">
        <h1 className="res-title">{name}</h1>
        <p className="res-details">
          {avgRating} Stars - {cuisines.join(", ")} - {costForTwoMessage}
        </p>
      </div>
      {categories.map((category, index, id) => (
        <MenuCategory
          category={category?.card?.card}
          key={category?.card?.card?.categoryId}
          showItems={index === showIndex ? true : false}
          showIndex={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};
export default ResMenu;
