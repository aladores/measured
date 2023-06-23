import { useState } from "react";
import React from "react";
import ItemDetail from "./ItemModal";
import "./ItemCard.css";

function ItemCard(props) {
  const [clickDetail, setClickDetail] = useState(false);
  const [hover, setHover] = useState(false);
  const toggleHover = () => setHover(!hover);

  function handleClickDetail() {
    setClickDetail(!clickDetail);
  }
  return (
    <div>
      <div
        className="item-card"
        onClick={handleClickDetail}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
      >
        <img
          className={"medium-thumbnail" + (hover ? " darken-image" : "")}
          src={props.imageSrc}
        ></img>
        <div className={"title-hover" + (hover ? " hover-show" : "")}>
          <p>{props.title}</p>
        </div>
      </div>
      <ItemDetail
        clickDetail={clickDetail}
        handleClickDetail={handleClickDetail}
        category={props.category}
        title={props.title}
        imageSrc={props.imageSrc}
        measurements={props.measurements}
      />
    </div>
  );
}
export default ItemCard;
