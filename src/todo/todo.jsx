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
        this.handleSearch = this.handleSearch.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkerAsDone = this.handleMarkerAsDone.bind(this)
        this.handleMarkerAsPending = this.handleMarkerAsPending.bind(this)
        this.handleClear = this.handleClear.bind(this);
        this.refresh();
    }

    refresh(description = ''){
        const search = description ? `/${description}` : ''
        axios.get(`${URL}${search}`)
            .then(resp => this.setState({...this.state , description: '', list: resp.data.data}))
    }
    //TODO Form buttons
    handleChange(e){
        this.setState({...this.state, description: e.target.value})
    }
    handleAdd(){
        const description = this.state.description
        axios.post(URL,{description})
            .then(resp => this.refresh())
    }
    handleSearch(){
        this.refresh(this.state.description)
    }
    handleClear(){
        this.refresh()
    }
    //TODO List buttons
    handleRemove(todo){
        axios.delete(`${URL}/${todo.id}`)
            .then(resp => this.refresh(this.state.description))
    }
    handleMarkerAsDone(todo){
        axios.put(`${URL}/${todo.id}` ,{...todo, done: true})
            .then(resp => this.refresh(this.state.description))
    }
    handleMarkerAsPending(todo){
        axios.put(`${URL}/${todo.id}` ,{...todo, done:false})
            .then(resp => this.refresh(this.state.description))
    }
    render(){
        return(
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm 
                    description={this.state.description} 
                    handleChange={this.handleChange}
                    handleAdd={this.handleAdd}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}
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