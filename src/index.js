import React, { useState } from "react";
import ReactDOM from "react-dom";

function List(props) {
  const { name, items, value, handler } = props;
  const options = [];

  options.push(
    <option key={name} value={name}>
      {name}
    </option>
  );

  for (var index in items) {
    const item = items[index];
    options.push(
      <option key={item} value={item}>
        {item}
      </option>
    );
  }

  return (
    <select value={value || name} onChange={handler}>
      {options}
    </select>
  );
}

function TwoLists(props) {
  const [brand, changeBrand] = useState(null);
  const [model, changeModel] = useState(null);

  const brands = () => Object.keys(props.data);
  const models = () =>
    brand !== null ? props.data[brand] : [];

  const knownBrand = brand => brands().indexOf(brand) !== -1;
  const knownModel = model => models().indexOf(model) !== -1;

  const brandChanged = event => {
    const brand = event.target.value;
    if (knownBrand(brand)) {
      changeBrand(brand);
    } else {
      changeBrand(null);
    }
    changeModel(null);
  }

  const modelChanged = event => {
    const model = event.target.value;
    if (knownModel(model)) {
      changeModel(model);
    } else {
      changeModel(null);
    }
  }

  const buttonClicked = event => {
    console.log(`${brand} ${model} riding...`);
  }

  const buttonDisabled = () => brand === null || model == null;

  return (
    <div id={props.id}>
      <List
        name="Brand"
        items={brands()}
        value={brand}
        handler={brandChanged}
      />
      <List
        name="Model"
        items={models()}
        value={model}
        handler={modelChanged}
      />
      <button onClick={buttonClicked} disabled={buttonDisabled()}>
        Ride
      </button>
    </div>
  );
}

TwoLists.defaultProps = {
  data: {
    Opel: ["Agila", "Astra", "Corsa", "Vectra"],
    Skoda: ["Fabia", "Octavia", "Superb", "Yeti"],
    Toyota: ["Auris", "Avensis", "Corolla", "Prius"]
  }
};

ReactDOM.render(<TwoLists id="two-lists" />, document.getElementById("root"));
