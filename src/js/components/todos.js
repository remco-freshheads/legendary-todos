import React from 'react';
import axios from 'axios';

export default class Todos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            errorMessage: null
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3000/todos').then((response) => {
            const todos = response.data
            console.log('GOT THE TODOS', todos);
            this.setState({
                todos: todos
            });
        }).catch((error) => {
            this.setState({
                errorMessage: error
            });
        });
    }

    render() {
        const { todos, errorMessage } = this.state;

        if (errorMessage) {
            return (
                <div>
                    { errorMessage }
                </div>
            );
        }

        if (!todos.length) {
            return (
                <div>
                    <h1>Er zijn geen todo's</h1>
                </div>
            );
        }

        return todos.map((todo) => {
            return (
                <div key={ todo.id }>
                    <h2>{ todo.text }</h2>
                    <p>{ todo.isCompleted ? 'Gedaan' : 'Not done' }</p>
                </div>
            );
        })
    }
}
