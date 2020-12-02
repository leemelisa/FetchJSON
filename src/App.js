import './App.css';
import React from 'react';

class App extends React.Component {
  state = {
    data: [],
    groups: [],
  }
  componentDidMount() {
    fetch('https://cors-anywhere.herokuapp.com/https://fetch-hiring.s3.amazonaws.com/hiring.json')
    .then(response => response.json())
    .then((jsonData) => {
      // Filter out any items where "name" is blank or null.
      let result = jsonData.filter(user => user.name !== "" && user.name !== null); 
      let groups = [];

      result.forEach(
        function(item) {
          groups[item.listId] = groups[item.listId] || [];
          groups[item.listId].push(item)
        } 
      )
      this.setState({
        data: jsonData,
        groups: groups,
      })
      console.log(groups)
    })
    .catch((error) => {
      // handle your errors here
      console.error(error)
    }) 
  }

  renderObj = () => {
    return this.state.groups.map(group => {
      // console.log(this.state.groups[key])
        return group.map(function(item) {
          return (
              <tr>
              <td>{item.listId}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          )
        })
     })
  }

  render() {
    if (this.state.groups === undefined) {
      return null;
    }
    return (
      <div>
        <h2>Fetch JSON Table</h2>
          <table>
            <tr>
              <th>ListId:</th>
              <th>Id:</th>
              <th>Name:</th>
            </tr>
            {this.renderObj()}
          </table>
      </div>
    );    
  }

}

export default App;
