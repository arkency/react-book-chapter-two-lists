class List extends React.Component {
  render() {
    let { name, items } = this.props;
    let options = [];

    options.push(<option value={name}>{name}</option>);

    for(var index in items) {
      let item = items[index];
      options.push(<option value={item}>{item}</option>);
    }

    return (
      <span>
        <select onChange={this.props.handler}>
          {options}
        </select>
      </span>
    );
  }
}

class TwoLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = { brand: null, model: null, models: [] };
    this.brandChanged = this.brandChanged.bind(this);
    this.modelChanged = this.modelChanged.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.knownModel = this.knownModel.bind(this);
    this.buttonDisabled = this.buttonDisabled.bind(this);
  }

  brandChanged(event) {
    let brand = event.target.value;
    if(this.knownBrand(brand)) {
      let models = this.data()[brand];
      this.setState({ brand, model: null, models: models });
    } else {
      this.setState({ brand, null, model: null, models: [] });
    }
  }

  modelChanged(event) {
    let model = event.target.value;
    if(this.knownModel(model)) {
      this.setState({ model });
    } else {
      this.setState({ model: null });
    }
  }

  buttonClicked(event) {
    let { brand, model } = this.state;
    console.log(this.state);
    console.log(`${brand} ${model} riding...`);
  }

  data() {
    return (
      {
        'Opel':   ['Agila', 'Astra', 'Corsa', 'Vectra'],
        'Škoda':  ['Fabia', 'Octavia', 'Superb', 'Yeti'],
        'Toyota': ['Auris', 'Avensis', 'Corolla', 'Prius']
      }
    );
  }

  brands() {
    return Object.keys(this.data());
  }

  knownBrand(brand) {
    return this.brands().indexOf(brand) !== -1
  }

  knownModel(model) {
    return this.state.models.indexOf(model) !== -1
  }

  buttonDisabled() {
    return !(this.state.brand !== null && this.state.model !== null)
  }

  render() {
    return (
      <div id={this.props.id}>
        <List name="Brand" items={this.brands()} handler={this.brandChanged} />
        <List name="Model" items={this.state.models} handler={this.modelChanged} />
        <button onClick={this.buttonClicked} disabled={this.buttonDisabled()}>Ride</button>
      </div>
    );
  }
}

React.render(
  <TwoLists id="two-lists"/>,
  document.getElementById("form")
);
