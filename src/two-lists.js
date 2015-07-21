class TwoLists extends React.Component {
  render() {
    return (
      <div id={this.props.id}>
        <span>List 1</span>
        <span>List 2</span>
      </div>
    );
  }
}

React.render(
  <TwoLists id="two-lists"/>,
  document.getElementById("form")
);
