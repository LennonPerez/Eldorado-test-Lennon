import PropTypes from "prop-types";

const Item = ({ item }) => {
  return (
    <div className="item-container">
      {item.image ? <img src={item.image} alt="img" /> : null}
      <h3>{item.title}</h3>
      {item.price ? <p>${item.price}</p> : null}
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Item;
