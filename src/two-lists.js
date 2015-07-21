class List extends React.Component {
  render() {
    let { name } = this.props;
    let options = [];

    options.push(<option value={name}>{name}</option>);

    for(var index in this.props.items) {
      let item = this.props.items[index];
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
  }

  brandChanged(event) {
    let brand = event.target.value;
    let models = this.data()[brand];
    this.setState({ brand, models: models || [] });
  }

  modelChanged(event) {
    this.setState({ model: event.target.value });
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

  render() {
    return (
      <div id={this.props.id}>
        <List name="Brand" items={Object.keys(this.data())} handler={this.brandChanged} />
        <List name="Model" items={this.state.models} handler={this.modelChanged} />
      </div>
    );
  }
}

React.render(
  <TwoLists id="two-lists"/>,
  document.getElementById("form")
);
