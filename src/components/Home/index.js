import './index.css'
import {Component} from 'react'

import Popup from 'reactjs-popup';


import {HiOutlineAdjustmentsHorizontal} from 'react-icons/hi2'
import {IoIosArrowDown} from 'react-icons/io'

class Home extends Component {
  state = {
    grouping: "",
    ordering: "",
    data: [],
  };

  componentDidMount() {
    this.renderApi();
  }

  onChangeGrouping = (e) => {
    this.setState({grouping:e.target.value})
  }

  renderApi = async () => {
    const {grouping} = this.state
    const apiUrl = `https://api.quicksell.co/v1/internal/frontend-assignment?sort_by=${grouping}`;
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      this.setState({ data: data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  renderUserDetails = (eachUser) => {
    const { id, name, available } = eachUser;
    const { data } = this.state;
    const { tickets } = data;
    const newData = tickets.filter((eachTicket) => eachTicket.userId === id);
    return (
      <>
        <li key={id} className="userProfile">
          <p>{name.slice(0, 1)}</p>
          <p>{name}</p>
          <p>{available}</p>
          <p>{newData.length}</p>
        </li>
        <li>
          {newData.map((eachTicket) => {
            return (
              <div className="card">
                <div className="card-set1">
                  <p>{eachTicket.id}</p>
                  <p>{eachTicket.userId}</p>
                </div>
                <p>{eachTicket.title}</p>
                <p>{eachTicket.tag}</p>
              </div>
            );
          })}
        </li>
      </>
    );
  };

  render() {
    const {data} = this.state
    const {users} = data
    return (
      <div className="homeContainer">
        <div className="navbar">
          <div className="popup-container">
            <Popup
              trigger={
                <div className="navbar-left">
                  <HiOutlineAdjustmentsHorizontal size={20} className="icon" />
                  <p className="nav-option">Display</p>
                  <IoIosArrowDown size={20} className="icon" />
                </div>
              }
              position="bottom left"
            >
              <div className="displayContainer">
                <div className="selectionContainer">
                  <p className="filter-name">Grouping</p>
                  <select className="options" onClick={this.onChangeGrouping}>
                    <option value="Status">Status</option>
                    <option value="User">User</option>
                    <option value="Priority">Priority</option>
                  </select>
                </div>

                <div className="selectionContainer">
                  <p className="filter-name">Ordering</p>
                  <select className="options">
                    <option value="Ascending">Asc</option>
                    <option value="Descending">Desc</option>
                    <option value="Title">Title</option>
                  </select>
                </div>
              </div>
            </Popup>
          </div>
        </div>

        {users && users.length > 0 ? (
          <ul className="usersList">
            {users.map((eachUser) => this.renderUserDetails(eachUser))}
          </ul>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Home