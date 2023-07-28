import { useState } from "react";
import React from "react";
import "./ItemView.css";

function ItemView(props) {
  const { active, category, title, size, imageSrc, measurements } =
    props.values;
  const { handleActive, handleDeleteItem } = props.handleFunctions;
  const [imageStatus, setImageStatus] = useState("");
  const measurementElements = Object.entries(measurements).map(
    ([key, values]) => (
      <div className="flex" key={key}>
        <p className="measurement-header">{key}:</p>
        <div className="measurement-value">
          <div className="measurement-value-container">
            <p>{values[0]}</p>
            <p>in</p>
          </div>
          <div className="measurement-value-container">
            <p>{values[1]}</p>
            <p>cm</p>
          </div>
        </div>
      </div>
    )
  );
  const activeButtonElement = active ? (
    <button
      className="primary-button inactive-button-color high-z-index position-right"
      onClick={() => handleActive(title.toUpperCase(), category)}
    >
      Set as Inactive
    </button>
  ) : (
    <button
      className="primary-button high-z-index position-right"
      onClick={() => handleActive(title.toUpperCase(), category)}
    >
      Set as Active
    </button>
  );

  function handleImageLoad() {
    setImageStatus("success");
  }
  return (
    <section className="item-modal-container text-medium">
      <div className="sub-row">
        <button
          className="back-button position-left"
          onClick={props.handleClickModal}
        >
          ←
        </button>
      </div>
      <div className="text-center">
        <img
          className="large-thumbnail"
          src={
            imageStatus === "success" ? imageSrc : "./data/images/loading.gif"
          }
          alt={title}
          onLoad={handleImageLoad}
        ></img>
        <h3 className="modal-title bold-text">{title}</h3>
        <div className="grey-line"></div>
        <div className="sub-row gap-15">
          <p>{category}</p>
          <p>{size.toUpperCase()}</p>
        </div>
      </div>
      <div className="item-measurements">{measurementElements}</div>
      <div className="bottom-button-container">
        {activeButtonElement}
        <button
          className="primary-button high-z-index"
          onClick={props.handleEdit}
        >
          Edit
        </button>

        <button
          className="primary-button high-z-index"
          onClick={() => handleDeleteItem(title.toUpperCase())}
        >
          Delete
        </button>
      </div>
    </section>
  );
}

export default ItemView;
