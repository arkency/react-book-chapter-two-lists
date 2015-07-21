class List extends React.Component {
  render() {
    let { name } = this.props;
    let options = [];

    options.push(<option value={name}>{name}</option>);

    for(var index in this.props.items) {
      let item = this.props.items[index];
      options.push(<option value={item}>{item}</option>);
    }

    return (<span><select>{options}</select></span>);
  }
}

class TwoLists extends React.Component {
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
        <List name="Brand" items={Object.keys(this.data())} />
        <List name="Model" items={[]} />
      </div>
    );
  }
}

React.render(
  <TwoLists id="two-lists"/>,
  document.getElementById("form")
);
