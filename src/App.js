import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Item from "./components/Item";
import Spinner from "./components/Spinner";

function App() {
  const [items, setItems] = useState([]);
  const [newitem, setNewItem] = useState({
    id: uuidv4(),
    title: "",
  });

  const getitems = async () => {
    if (localStorage.getItem("items")) {
      setItems(JSON.parse(localStorage.getItem("items")));
    } else {
      const res = await fetch("https://fakestoreapi.com/products?limit=3");
      const result = await res.json();
      setItems(result);
    }
  };

  const readNewItem = (e) => {
    setNewItem({
      ...newitem,
      title: e.target.value,
    });
  };

  const addNewItem = (e) => {
    e.preventDefault();
    setItems([...items, newitem]);
    localStorage.setItem("items", JSON.stringify([...items, newitem]));
    setNewItem({
      id: uuidv4(),
      title: "",
    });
  };

  useEffect(() => {
    getitems();
  }, []);

  return (
    <div className="App-container">
      <div className="main-container">
        <div className="form-container">
          <h1>products list</h1>
          <form onSubmit={addNewItem}>
            <input
              type="text"
              name="title"
              value={newitem.title}
              placeholder="new item"
              onChange={readNewItem}
            />
            <button type="submit">add</button>
          </form>
        </div>
        <main>
          {items.length > 0 ? (
            items.map((item) => <Item item={item} key={item.id} />)
          ) : (
            <Spinner />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
