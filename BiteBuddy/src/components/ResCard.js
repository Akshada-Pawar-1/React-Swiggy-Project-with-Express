import { CDN_URL } from "../utils/constants";
// import { useContext } from "react";
// import UserContext from "../utils/UserContext";

const ResCard = (props) => {
  const { resData } = props;
  const { name, cuisines, avgRating, cloudinaryImageId } = resData?.info;
  // console.log(resData);

  // const { loggedInUser } = useContext(UserContext);

  return (
    <div className="res-card" data-testid="resCard">
      <img
        className="res-img"
        alt="Res logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3>{name}</h3>
      <div className="res-content">
        <h4>{avgRating} Stars</h4>
        <h4>{resData.info.sla.deliveryTime} minutes</h4>
      </div>
      <h4>{cuisines.join(", ")}</h4>
      {/* <h4>{loggedInUser}</h4> */}
    </div>
  );

  // Higher Order Component
  // Input - Restaurant card => Restaurant Card with Label
};

export default ResCard;

export const withLabel = (ResCard) => {
  return (props) => {
    return (
      <div>
        <label className="with-label">Top</label>
        <ResCard {...props} />
      </div>
    );
  };
};
