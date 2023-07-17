import React from "react";
import { useState, useEffect } from "react";
import "./EditView.css";

function EditView(props) {
  const [currentUnit, setCurrentUnit] = useState("in");
  const [currentCategory, setCurrentCategory] = useState(props.category);
  const [currentTitle, setCurrentTitle] = useState(props.title);
  const [currentImage, setCurrentImage] = useState(props.imageSrc);
  const [currentSize, setCurrentSize] = useState(props.size);
  const [currentMeasurements, setCurrentMeasurements] = useState(
    props.measurements
  );
  const [prevTitle, setPrevTitle] = useState(props.title);

  //0 = Tops, Outerwear, 1 = Bottoms
  const measurementCategory = [
    ["Chest", "Length", "Shoulders", "Sleeve Length", "Hem"],
    ["Waist", "Inseam", "Leg Opening", "Front Rise", "Thigh", "Knee"],
  ];
  const currentUnitIndex = currentUnit === "in" ? 0 : 1;
  const inchButtonClass =
    currentUnit === "in" ? " primary-button" : " secondary-button-color";
  const cmButtonClass =
    currentUnit === "in" ? " secondary-button-color" : " primary-button";

  const measurementElements = (
    <div className="measurement-container">
      {measurementCategory[0].map((item, index) => (
        <div className="unit-input-row" key={index}>
          <label htmlFor={`${item}`} className="text-normal">
            {item}
          </label>
          <div>
            <input
              type="number"
              id={`${item}`}
              name={`${item}`}
              className="unit-input text-normal"
              value={currentMeasurements[item]?.[currentUnitIndex] || ""}
              min="0.00"
              step=".01"
              placeholder="0.00"
              onChange={handleUnitInput}
            />
            {currentUnit}
          </div>
        </div>
      ))}
    </div>
  );

  function handleUnitClick() {
    const newUnit = currentUnit === "in" ? "cm" : "in";
    setCurrentUnit(newUnit);
  }
  function handleUnitInput(event) {
    const { name, value } = event.target;
    let inchValue = 0;
    let cmValue = 0;

    if (value.includes(".")) {
      if (value.split(".")[1].length > 2) {
        return;
      }
    }

    if (currentUnit === "in") {
      inchValue = value;
      cmValue = (inchValue * 2.54).toFixed(2);
    } else {
      cmValue = value;
      inchValue = (cmValue / 2.54).toFixed(2);
    }

    setCurrentMeasurements((currentMeasurements) => ({
      ...currentMeasurements,
      [name]: [[inchValue], [cmValue]],
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    const newItem = {
      category: currentCategory,
      title: currentTitle,
      size: currentSize,
      imageSrc: currentImage,

      measurements: {
        Chest: [
          currentMeasurements["Chest"][0],
          currentMeasurements["Chest"][1],
        ],
        Length: [
          currentMeasurements["Length"][0],
          currentMeasurements["Length"][1],
        ],
        Shoulders: [
          currentMeasurements["Shoulders"][0],
          currentMeasurements["Shoulders"][1],
        ],
        "Sleeve Length": [
          currentMeasurements["Sleeve Length"][0],
          currentMeasurements["Sleeve Length"][1],
        ],
        Hem: [currentMeasurements["Hem"][0], currentMeasurements["Hem"][1]],
      },
    };

    if (props.titleError === true) {
      return;
    }
    props.handleUpdate(newItem, prevTitle.toUpperCase());
    props.handleEditBack();
  }

  function handleImagePreview(event) {
    setCurrentImage(event.target.value);
    let previewElement = document.getElementById("image-preview");
    if (event.target.value.length > 0) {
      previewElement.src = event.target.value;
      previewElement.classList.add("display-block");
    } else {
      previewElement.classList.remove("display-block");
    }
  }

  function handleTitle(event) {
    setCurrentTitle(event.target.value);
  }

  useEffect(() => {
    props.verifyTitle(currentTitle, prevTitle);
  }, [currentTitle]);

  function handleSize(event) {
    setCurrentSize(event.target.value);
  }

  const titleErrorElement =
    props.titleError === true ? (
      <div className="title-error">
        <p className="error-text">Error {currentTitle} already exists.</p>
      </div>
    ) : (
      ""
    );

  return (
    <section className="item-modal-container">
      <div className="sub-row">
        <button
          className="back-button secondary-link-color position-left"
          onClick={() => {
            props.handleClickModal;
            props.handleEditBack();
          }}
        >
          ←
        </button>
        <h3 className="bold-text header-medium">Edit item</h3>
      </div>
      <form
        id="edit-form"
        className="flex-column gap-5 text-normal"
        onSubmit={handleSave}
      >
        <div className="image-preview-container">
          <img
            id="image-preview"
            className="medium-thumbnail"
            src={currentImage}
          ></img>
        </div>
        <div className="form-row">
          <label htmlFor="image" className="bold-text">
            Image:{" "}
          </label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Image URL"
            value={currentImage}
            className="text-normal form-input"
            onChange={handleImagePreview}
          />
        </div>
        <div className="form-row">
          <label htmlFor="html" className="bold-text">
            Title:{" "}
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={currentTitle}
            className="text-normal form-input"
            onChange={handleTitle}
          ></input>
        </div>
        {titleErrorElement}
        <div className="edit-grey-line"></div>
        <div className="form-row gap-15">
          <div className="flex align-center gap-5">
            <label htmlFor="category" className="bold-text">
              Category:
            </label>
            <select
              name="category"
              id="category"
              className="category"
              defaultValue={currentCategory}
            >
              <option value="Tops">Tops</option>
              <option value="Bottoms">Bottoms</option>
              <option value="Outerwear">Outerwear</option>
            </select>
          </div>
          <div className="flex align-center gap-5">
            <label htmlFor="size" className="bold-text">
              Size:
            </label>
            <select
              name="size"
              id="size"
              className="size"
              defaultValue={currentSize}
              onChange={handleSize}
            >
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>
        </div>
        <div className="edit-measurement-container">
          <div className="form-row justify-space-between">
            <label className="bold-text">Measurements</label>
            <div>
              <button
                type="button"
                className={"primary-button black-border" + inchButtonClass}
                onClick={handleUnitClick}
              >
                Inch
              </button>
              <button
                type="button"
                className={"primary-button black-border" + cmButtonClass}
                onClick={handleUnitClick}
              >
                Cm
              </button>
            </div>
          </div>
          {measurementElements}
        </div>

        <div>
          <input
            type="submit"
            value="Save"
            className="primary-button submit-button"
            onClick={handleSave}
          />
        </div>
      </form>
    </section>
  );
}

export default EditView;