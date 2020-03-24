import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUserPlus, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import _ from 'lodash';
import './create_group.css'

class CreateGroup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      groupName: "",
      startTime: "",
      endTime: new Date(),
      users: Object.values(this.props.users),
      selectedFoodRestrictions: [],
      foodRestrictions: [],
      monetaryRestriction: "",
      isSplit: true,
      userSearch: "",
      candidates: [],
      addUsers: []
    }

    this.moneySelect = this.moneySelect.bind(this);
    this.moneyHandle = this.moneyHandle.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.candidateSelected = this.candidateSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTextChange(e) {
    const value = e.target.value;

    let candidates = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      candidates = this.state.users.filter(user => (regex.test(user.username)) || (regex.test(user.email)));
    }

    this.setState({
      candidates,
      userSearch: value
    })
  }

  moneyHandle(e) {
    e.preventDefault();
    if (this.listBox.classList.contains("list-box-click")) {
      this.listBox.classList.remove("list-box-click")
    } else {
      this.listBox.classList.add("list-box-click")
    }
  };

  moneySelect(e) {
    this.setState({ monetaryRestriction: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);

    // let selectedFoodRestrictions = null;
    // if (!_.isEmpty(this.props.foodRestrictions)) {
    //   selectedFoodRestrictions = this.state.selectedFoodRestrictions.map((selectedRestriction) => {
    //     let curEl = Object.values(this.props.foodRestrictions).filter(restriction => restriction.restriction === selectedRestriction)
    //     return curEl[0]._id
    //   })
    // }

    // const newGroup = {
    //   groupName: this.state.groupName,
    //   endTime: this.state.endTime,
    //   users: this.state.candidates,
    //   foodRestrictions: this.state.selectedFoodRestrictions,
    //   monetaryRestriction: this.state.monetaryRestriction,
    //   isSplit: this.state.isSplit
    // }

    // this.props.createGroup(newGroup);
  }

  handleChange(type) {
    let that = this;
    return function (e) {
      if (type === "groupName") {
        that.setState({ groupName: e.target.value });
      } else if (type === "endTime") {
        that.setState({ endTime: e.target.value });
      } else if (type === "monetary-restriction") {
        that.setState({ monetaryRestriction: e.target.value });
      } else if (type === "isSplit") {
        let isSplit;
        if (that.state.isSplit === true){
          isSplit = false;
        } else {
          isSplit = true
        }
        that.setState({ isSplit: isSplit });
      }
    }
  }

  renderCandidates() {
    const { candidates } = this.state;
    if (candidates.length === 0) return null;
    return (
      <div className="auto-complete-users-container">
        {candidates.slice(0, 5).map((user, idx) => {
          return (
            <div className="auto-complete-user" onClick={this.candidateSelected} key={idx} value={user._id}>
              <img src="profile-icon.png"/>
              <span>{user.username}</span>
              <span>( {user.email} )</span>
            </div>
          )
        })}
      </div>
    )
  }

  updateFoodRestrictions(userIds){
    let foodRestrictions = [];
    let selectedFoodRestrictions = [];
    for(let i=0; i < userIds.length; i++){
      let frArr = (this.props.users[userIds[i]].foodRestriction);
      for(let j = 0; j < frArr.length; j++){
        if (!selectedFoodRestrictions.includes(frArr[j].restriction)){
          foodRestrictions.push(frArr[j]._id)
          selectedFoodRestrictions.push(frArr[j].restriction)
        }
      }
    }
    return ({
      foodRestrictions,
      selectedFoodRestrictions
    })
  }

  candidateSelected(e) {
    const curVal = e.currentTarget.getAttribute("value");
    let addUsers;
    if (!this.state.addUsers.includes(curVal)){
      addUsers = [...this.state.addUsers, e.currentTarget.getAttribute("value")];
    } else {
      addUsers = this.state.addUsers;
    }

    const { foodRestrictions, selectedFoodRestrictions} = this.updateFoodRestrictions(addUsers);
    this.setState({
      userSearch: "",
      candidates: [],
      addUsers,
      selectedFoodRestrictions,
      foodRestrictions
    })
  }

  removeUser(e){
    const curId = e.currentTarget.parentNode.getAttribute("value")
    let newUsers = this.state.addUsers.filter(userId => userId !== curId);
    const { foodRestrictions, selectedFoodRestrictions } = this.updateFoodRestrictions(newUsers);

    this.setState({
      addUsers: newUsers,
      selectedFoodRestrictions,
      foodRestrictions
    })
  }

  render(){
    return (
      <div className="create-group-form">
        <form onSubmit={this.handleSubmit}>
          <div className="groupname">
            <div className="groupname-container">
              <label> <span>Group Name</span>
                <div>
                  <input
                    required
                    onChange={this.handleChange("groupName")}
                    className="input-field"
                    type="text"
                    value={this.state.groupName}
                    placeholder="group name"
                  />
                  <span className="inputicon">
                    <FontAwesomeIcon icon={faUsers} color="#2c2c2c30" size="sm" />
                  </span>
                </div>
              </label>
            </div>
          </div>
          <div className="add-users">
            <div className="add-users-container">
              <label className="group-label" htmlFor="add-users">
                <span>Add Users</span>
                <div className="add-users-form">
                  <input
                    onChange={this.handleTextChange}
                    className="input-field"
                    type="text"
                    value={this.state.userSearch}
                    placeholder="Add Users"
                  />
                  <span className="inputicon">
                    <FontAwesomeIcon icon={faUserPlus} color="#2c2c2c30" size="sm" />
                  </span>
                  <div className="auto-complete-users">
                    {this.renderCandidates()}
                  </div>
                </div>
              </label>
              <div className="added-users">
                {this.state.addUsers.map((userId, idx) => 
                  (<div className="added-user" key={idx} value={userId}>
                    <img src="profile-icon.png" />
                    <span>{this.props.users[userId].username}</span>
                    <span> [{this.props.users[userId].email}] </span>
                    <span onClick={this.removeUser}><FontAwesomeIcon icon={faTimes} color="#545454" size="sm" /></span>
                  </div>)
                  )}
              </div>
            </div>
          </div>
          <div className="optional-divider">
            <div className="get-started-bar"></div>
            <h2>Optional</h2>
            <div className="get-started-bar"></div>
          </div>
          <div className="create-group-form-row">
            <div className="endtime">
              <div className="endtime-container">
                <label> End Time
                  <input
                  onChange={this.handleChange("endTime")}
                  className="endtime-input-field"
                  type="datetime-local"
                  value={this.state.endTime}
                />
                </label>
              </div>
            </div>
            <div className="is-split">
              <div className="is-split-container">
                <label> Cost Covered?</label>
                <label htmlFor="styled">
                  <div className="switch">
                    <input type="checkbox" name="styled" id="styled" onChange={this.handleChange("isSplit")} />
                    <div className="slider"></div>
                  </div>
                </label>
                <div className="is-split-explanation"> {(this.state.isSplit) ? "Everyone will split." : "Host will pay for this event."}</div>
              </div>
            </div>
          </div>
          <div className="create-group-form-row">
            <div className="monetary-restriction">
              <div className="monetary-restriction-container">
                <div className="monetary-restriction-container">
                  <label className="onboarding-label" htmlFor="monetary-restriction">
                    Monetary Restriction
                      </label>
                  <div className="input-field-container">
                    <div className="drop-down">
                      <button className="drop-down-button" onClick={this.moneyHandle}>Select ▾ </button>
                      <div className="list-box" ref={el => this.listBox = el}>
                        <ul className="list-box-items">
                          <li className="list-box-item">
                            <label> $ </label>
                            <input value="$" type="radio" onChange={this.moneySelect} checked={this.state.monetaryRestriction === "$"} />
                          </li>
                          <li className="list-box-item">
                            <label> $$ </label>
                            <input value="$$" type="radio" onChange={this.moneySelect} checked={this.state.monetaryRestriction === "$$"} />
                          </li>
                          <li className="list-box-item">
                            <label> $$$ </label>
                            <input value="$$$" type="radio" onChange={this.moneySelect} checked={this.state.monetaryRestriction === "$$$"} />
                          </li>
                          <li className="list-box-item">
                            <label> $$$$ </label>
                            <input value="$$$$" type="radio" onChange={this.moneySelect} checked={this.state.monetaryRestriction === "$$$$"} />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="food-restriction">
              <div className="food-restriction-container">
                <label className="group-label" htmlFor="food-restriction">
                  Food Restriction
                </label>
                <div className="food-restriction-items">
                  {(this.state.selectedFoodRestrictions === null ? null : this.state.selectedFoodRestrictions.map((selectedFoodRestriction, idx) =>
                    <div className="food-restriction-item" key={idx}>
                      {selectedFoodRestriction}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
          <div className="submit-container">
            <input className="submit-button" type="submit" value="Create Group" />
          </div>
        </form>
      </div>    
    )
  }
}

export default CreateGroup;