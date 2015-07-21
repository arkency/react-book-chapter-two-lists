class List extends React.Component {
  render() {
    return (<span>{this.props.name}</span>);
  }
}

class TwoLists extends React.Component {
  render() {
    return (
      <div id={this.props.id}>
        <List name="Brand" />
        <List name="Model" />
      </div>
    );
  }
}

React.render(
  <TwoLists id="two-lists"/>,
  document.getElementById("form")
);
