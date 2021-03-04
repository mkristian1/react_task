/*
Загружаем список пользователей и отображаем его.
По клику на имя оргинизации пользователя делаем его
оргинизацию "выбранной" и отображаем только пользователей
этой организации.
Так же, при наличии выбранной организации, нужно
дать возможность ее сбросить. Для этого рендерим кнопку.
*/

/* Ошибки */
// При получение данных Users и Оrganizations должен хранится в State
// Нету Catch в Промисе
// Html в Array
// Нету Key user-list-item
// Organizaition

import React, { Component } from "react";
import { getUsers, getOrganizations } from "./api";
import Loading from "./components/loading";
import UserListItem from "./components/user-list-item";

class App extends Component {
  state = {
    users: [],
    organizations: [],
    loading: true,
    selectedOrg: null,
    selectedOrgId: null,
  };

  componentDidMount() {
    getUsers()
      .then(users => (this.setState({ users })))
      .then(() => getOrganizations())
      .then(organizations => (this.setState({ organizations })))
      .then(() => this.setState({ loading: false }))
      .catch(err => console.log(err));
  }

  resetSelectedOrg = () => {
    this.setState({ selectedOrg: false });
  };

  selectOrg = org => {
    this.setState(() => {
      return { selectedOrg: true, selectedOrgId: org }
    });
  };

  render() {
    const { users, organizations, selectedOrg, selectedOrgId, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    const UserData = users.filter(
      usr => {
        if (selectedOrg) {
          return usr.organizaiton === selectedOrgId;
        } else {
          return usr
        }
      })
      .map(user => {
        let org = organizations[user.organizaiton].name;
        return <UserListItem selectOrg={this.selectOrg} key={user.id} user={user} org={org} />
      });


    return (
      <div>
        {selectedOrg && (
          <button onClick={() => this.resetSelectedOrg()}>
            reset selected org
          </button>
        )}
        <div className="user-list">
          {UserData}
        </div>
      </div>
    );
  }
}

export default App;
