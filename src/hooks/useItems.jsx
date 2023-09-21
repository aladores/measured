import { useState, useEffect } from "react";

function useItems() {
  const [items, setItems] = useState({});
  const [titleError, setTittleError] = useState(false);
  const addItem = (newItem) => {
    setItems((prevItems) => {
      return { ...prevItems, [newItem.title.toUpperCase()]: newItem };
    });
  };

  const deleteItem = (title) => {
    setItems((prevItems) => {
      const updatedItems = { ...prevItems };
      delete updatedItems[title];
      return updatedItems;
    });
  };

  const updateItem = (updatedItem, prevTitle) => {
    const updatedTitle = updatedItem.title.toUpperCase();

    setItems((prevItems) => {
      const updatedItems = { ...prevItems };
      if (prevTitle === updatedTitle.toUpperCase()) {
        // Replace the value for the existing key
        updatedItems[prevTitle] = updatedItem;
      } else {
        updatedItems[updatedTitle] = updatedItems[prevTitle];
        delete updatedItems[prevTitle];
        updatedItems[updatedTitle] = updatedItem;
      }
      return updatedItems;
    });
  };

  const activeItem = (title, category, newItem = false) => {
    setItems((prevItems) => {
      const updatedItems = { ...prevItems };

      if (updatedItems[title] && newItem === false) {
        updatedItems[title].active = !updatedItems[title].active;
      }

      Object.entries(updatedItems).forEach(([key, value]) => {
        if (key !== title && value.category === category) {
          updatedItems[key].active = false;
        }
      });

      return updatedItems;
    });
  };

  function handleTitleError(title, prevTitle = "") {
    if (title === prevTitle) {
      setTittleError(false);
      return;
    }
    if (items[title.toUpperCase()]) {
      setTittleError(true);
      return;
    }

    setTittleError(false);
  }

  function handleImport(importedItems) {
    setItems(importedItems);
  }

  //Load data from local storage
  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.local.get("items", (result) => {
      const savedItems = result.items;
      setItems(savedItems || {});
    });
  }, []);

  //Save data to local storage
  useEffect(() => {
    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ items }, () => {});
  }, [items]);

  return [
    items,
    titleError,
    addItem,
    deleteItem,
    updateItem,
    activeItem,
    handleImport,
    handleTitleError,
  ];
}

export default useItems;
