import ResCard, { withLabel } from "./ResCard";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
// import resList from "../utils/mockData";
// You can delete mockData now, as in this file we're directly using data from Swiggy API Dynamically

export const Body = () => {
  const [listOfRes, setListOfRes] = useState([]);
  const [searchResList, setSearchResList] = useState([]);
  const [noResultFound, setNoResultFound] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterButtonText, setFilterButtonText] = useState(true);
  const { loggedInUser, setUserName } = useContext(UserContext);
  const onlineStatus = useOnlineStatus();
  const ResCardLabeled = withLabel(ResCard);

  const API_BASE =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API_BASE_PROD
      : process.env.REACT_APP_API_BASE_DEV;

  useEffect(() => {
    fetchData();
  }, []);

  console.log("API_BASE:", API_BASE); // Debugging line
  
  const fetchData = async () => {
    try {
      const data = await fetch(`${API_BASE}/api/restaurants`);

      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      const json = await data.json();
      console.log(json);

      const apiData =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      if (!apiData) {
        throw new Error(`No restaurants are available`);
      }

      setListOfRes(apiData);
      setSearchResList(apiData);

      // console.log(apiData);
    } catch (error) {
      console.log("Error fetching restaurant Data:", error.message || error);
      alert(
        "Failed to fetch restaurant data. Add ALLOW CORS Extension in your chrome browser!"
      );
    }
  };

  const searchData = listOfRes.filter((restaurant) =>
    restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = () => {
    console.log(searchText);
    if (searchData.length === 0) {
      setNoResultFound(true);
    } else {
      setNoResultFound(false);
      setSearchResList(searchData);
    }
  };

  const clearSearch = () => {
    const searchString = searchText.replaceAll(" ", "");
    if (searchString.length > 0) {
      console.log(searchText + " value Cleared");
      setSearchText("");
      setSearchResList(listOfRes);
      setNoResultFound(false);
    }
  };

  const filterRes = () => {
    setSearchText("");
    if (filterButtonText) {
      const topRes = listOfRes.filter(
        (restaurant) => restaurant.info.avgRating > 4.4
      );
      setSearchResList(topRes);
      setNoResultFound(topRes.length === 0);
      setFilterButtonText(false);
    } else {
      setSearchResList(listOfRes);
      setFilterButtonText(true);
      setNoResultFound(false);
    }
  };

  //Online and Offline condition
  if (onlineStatus === false)
    return (
      <h2>
        Your Internet connection is lost! Please check your Internet
        connectivity!
      </h2>
    );

  // Conditional Rendering
  return listOfRes.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            data-testid="searchInput"
            placeholder="Search restaurant"
            className="input-box"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
          <button className="common-btn" onClick={clearSearch}>
            Clear
          </button>
          <button className="common-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div>
          <label>User Name: </label>
          <input
            type="text"
            className="input-box"
            value={loggedInUser}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <button className="common-btn" onClick={filterRes}>
          {filterButtonText ? "Top Rated Restaurants" : "All Restaurants"}
        </button>
      </div>

      <div className="res-container">
        {noResultFound ? (
          <h3>No result found</h3>
        ) : (
          searchResList.map((restaurant) => (
            <Link
              className="no-underline"
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
            >
              {restaurant.info.avgRating > 4.4 ? (
                <ResCardLabeled resData={restaurant} />
              ) : (
                <ResCard resData={restaurant} />
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
