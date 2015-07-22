class List extends React.Component {
  render() {
    let { name, items, value, handler } = this.props;
    let options = [];

    options.push(<option value={name}>{name}</option>);

    for(var index in items) {
      let item = items[index];
      options.push(<option value={item}>{item}</option>);
    }

    if(value === null) { value = name; }

    return (
      <span>
        <select value={value} onChange={handler}>
          {options}
        </select>
      </span>
    );
  }
}

class TwoLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = { brand: null, model: null };

    this.knownBrand = this.knownBrand.bind(this);
    this.brandChanged = this.brandChanged.bind(this);
    this.knownModel = this.knownModel.bind(this);
    this.modelChanged = this.modelChanged.bind(this);
    this.brands = this.brands.bind(this);
    this.models = this.models.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.buttonDisabled = this.buttonDisabled.bind(this);
  }

  knownBrand(brand) {
    return this.brands().indexOf(brand) !== -1
  }

  brandChanged(event) {
    let brand = event.target.value;
    if(this.knownBrand(brand)) {
      this.setState({ brand, model: null });
    } else {
      this.setState({ brand: null, model: null });
    }
  }

  knownModel(model) {
    return this.models().indexOf(model) !== -1
  }

  modelChanged(event) {
    let model = event.target.value;
    if(this.knownModel(model)) {
      this.setState({ model });
    } else {
      this.setState({ model: null });
    }
  }

  brands() {
    return Object.keys(this.props.data);
  }

  models() {
    let { brand } = this.state;
    return (brand !== null ? this.props.data[brand] : []);
  }

  buttonClicked(event) {
    let { brand, model } = this.state;
    console.log(`${brand} ${model} riding...`);
  }

  buttonDisabled() {
    return !(this.state.brand !== null && this.state.model !== null)
  }

  render() {
    return (
      <div id={this.props.id}>
        <List name="Brand" items={this.brands()}
              value={this.state.brand}
              handler={this.brandChanged} />
        <List name="Model" items={this.models()}
              value={this.state.model}
              handler={this.modelChanged} />
        <button onClick={this.buttonClicked}
                disabled={this.buttonDisabled()}>
                Ride
        </button>
      </div>
    );
  }
}

TwoLists.defaultProps = {
  data: {
    'Opel':   ['Agila', 'Astra', 'Corsa', 'Vectra'],
    'Škoda':  ['Fabia', 'Octavia', 'Superb', 'Yeti'],
    'Toyota': ['Auris', 'Avensis', 'Corolla', 'Prius']
  }
};

React.render(
  <TwoLists id="two-lists"/>,
  document.getElementById("form")
);
