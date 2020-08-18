import React from "react";
import FontAwesome from "react-fontawesome";
import "./Dropdown.css";
import onClickOutside from "react-onclickoutside";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: props.title,
      list: props.list,
      searchText: "",
      moreClicked: false,
    };
  }

  handleClickOutside = () => {
    if (this.state.listOpen) this.toggleList();
  };

  toggleList() {
    this.setState((prevState) => ({
      listOpen: !prevState.listOpen,
      searchText: "",
      list: this.props.list,
      moreClicked: false,
    }));
  }

  searchOnChange = (e) => {
    let newList = this.props.list.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    this.setState({ list: newList, searchText: e.target.value });
  };

  onAddAndSelect = () => {
    let newItem = {
      id: Math.max(...this.props.list.map((item) => item.id)) + 1,
      title: this.state.searchText,
    };
    this.onItemClick(newItem);
    this.props.onAddNewItem(newItem);
  };

  onItemClick = (item) => {
    this.setState({
      headerTitle: item.title,
    });
    this.toggleList();
    this.props.onChange(item);
  };

  render() {
    const { list, listOpen, headerTitle, moreClicked } = this.state;
    const { defaultShow, enableAddMore } = this.props;

    let newList = moreClicked ? list : list.slice(0, defaultShow);

    return (
      <div className="dd-wrapper">
        <div className="dd-header" onClick={() => this.toggleList()}>
          <div className="dd-header-title">{headerTitle}</div>
          {listOpen ? (
            <FontAwesome className="ddl-icon" name="angle-up" size="2x" />
          ) : (
            <FontAwesome className="ddl-icon" name="angle-down" size="2x" />
          )}
        </div>

        {listOpen && (
          <div className="ddl-list-container">
            <div className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                onChange={this.searchOnChange}
              />
            </div>

            {newList.length > 0 ? (
              <>
                <ul className="dd-list">
                  {newList.map((item) => (
                    <li
                      className="dd-list-item"
                      key={item.title}
                      onClick={() => this.onItemClick(item)}
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
                {!moreClicked && list.length > defaultShow && (
                  <div
                    className="more-label"
                    onClick={() => this.setState({ moreClicked: !moreClicked })}
                  >
                    {`${defaultShow} and more...`}{" "}
                  </div>
                )}
              </>
            ) : (
              <div className="no-data-found">
                {`"${this.state.searchText}" not found`}
                {enableAddMore && (
                  <button
                    onClick={this.onAddAndSelect}
                    className="add-select-btn"
                  >
                    {"Add & Select"}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default onClickOutside(Dropdown);
