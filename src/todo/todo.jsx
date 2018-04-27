import React,{Component} from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:8080/api/todos'

export default class Todo extends Component{
    constructor(props){
        super(props)
        this.state = {description: '', list: []}

        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkerAsDone = this.handleMarkerAsDone.bind(this)
        this.handleMarkerAsPending = this.handleMarkerAsPending.bind(this)
        this.refresh();
    }

    refresh(){
        axios.get(URL).then(resp => this.setState({...this.state , description: '', list: resp.data.data}))
        axios.get(URL).then(resp => console.log(resp.data))
    }
    handleChange(e){
        this.setState({...this.state, description: e.target.value})
    }
    handleAdd(){
        const description = this.state.description
        axios.post(URL,{description})
            .then(resp => this.refresh())
    }
    handleRemove(todo){
        axios.delete(`${URL}/${todo.id}`)
            .then(resp => this.refresh())
    }
    handleMarkerAsDone(todo){
        axios.put(`${URL}/${todo.id}` ,{...todo, done: true})
            .then(resp => this.refresh())
    }
    handleMarkerAsPending(todo){
        axios.put(`${URL}/${todo.id}` ,{...todo, done:false})
            .then(resp => this.refresh())
    }
    render(){
        return(
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm 
                    description={this.state.description} 
                    handleChange={this.handleChange}
                    handleAdd={this.handleAdd}

                    />
                <TodoList
                     list={this.state.list}
                     handleRemove={this.handleRemove}
                     handleMarkerAsDone={this.handleMarkerAsDone}
                     handleMarkerAsPending={this.handleMarkerAsPending}
                    />
            </div>
        )
    }
}