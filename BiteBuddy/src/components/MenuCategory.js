import MenuItem from "./MenuItem";

const MenuCategory = ({ category, showItems, showIndex }) => {
  //   const { title, itemCards } = props;

  const handleClick = () => {
    showIndex();
    console.log("Expand/Close Menu");
  };

  return (
    <div className="accordion-menu">
      <div className="accordion-title" onClick={handleClick}>
        <h3>
          {category.title} ({category.itemCards.length})
        </h3>
        <span>{showItems ? "🔽" : "▶"}</span>
      </div>
      {showItems && <MenuItem itemCards={category?.itemCards} />}
    </div>
  );
};
export default MenuCategory;
