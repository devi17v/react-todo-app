import React from "react";
import "./app.css";

class App extends React.Component {
  state = {
    todos: [],
    newTodo: "",
  };

  addTodo = () => {
    const { todos, newTodo } = this.state;
    if (newTodo.trim() !== "") {
      const todo = {
        name: newTodo,
        status: false,
      };
      this.setState({
        todos: [...todos, todo],
        newTodo: "",
      });
    }
    console.log(todos);
  };

  handleInputChange = (e) => {
    this.setState({
      newTodo: e,
    });
    console.log(e);
  };

  deleteTodo = (index) => {
    const { todos } = this.state;
    todos.splice(index, 1);
    this.setState({ todos: [...todos] });
  };

  handleToggleTodo = (index) => {
    const { todos } = this.state;
    todos[index].status = !todos[index].status;
    // todos[index].name = todos[index].name + todos[index].status
    this.setState({ todos: [...todos] });
  };

  handleToggleAll = (checked) => {
    const { todos } = this.state;
    const toggleAll = todos.map((data) => ({ ...data, status: checked }));

    this.setState({ todos: [...toggleAll] });
  };
  render() {
    const statusCount = this.state.todos.filter((todo) => todo.status).length;
    return (
      <div className="body-container">
        <div className="app">
          <div>
            <h1>TODO</h1>
            <div className="header">
              <h3>Total Todo: {this.state.todos.length}</h3>
              <h3>Checked: {statusCount}</h3>
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="NewTodo">
              <input
                type="text"
                name="todo"
                value={this.state.newTodo}
                placeholder="Type your todo"
                onChange={(e) => {
                  this.handleInputChange(e.target.value);
                }}
              />
            </label>
            <button name="ADD" className="add-button" onClick={this.addTodo}>
              ADD
            </button>
          </div>
          <div class="select-container">
            {this.state.todos.length > 1 && (
              <label className="todo-list">
                <input
                  type="checkbox"
                  checked={statusCount === this.state.todos.length}
                  onClick={() =>
                    this.handleToggleAll(
                      statusCount !== this.state.todos.length
                    )
                  }
                />
                <div className="todo-name">Select All</div>
              </label>
            )}
            {this.state.todos.length === 0 && <p>No Todo Found</p>}
          </div>
          <div className="list-container">
            <ul>
              {this.state.todos.map((data, index) => (
                <li key={index} className="todo-list">
                  <input
                    type="checkbox"
                    checked={data.status}
                    onClick={() => {
                      this.handleToggleTodo(index);
                    }}
                  />
                  <div className="todo-name">{data.name}</div>{" "}
                  <button name="ADD" onClick={this.deleteTodo}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
