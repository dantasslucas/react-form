import React from 'react'
import IconButon from '../template/iconButton'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { markerAsDone, markerAsPending, remove } from './todoAction'

const TodoList = props => {

    const renderRows = () => {
        const list = props.list || []
        return list.map((todo, index) => (
            <tr key={index}>
                <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                <td>
                    <IconButon style='success' icon='check' hide={todo.done}
                        onClick={() => props.markerAsDone(todo)}></IconButon>
                    <IconButon style='warning' icon='undo' hide={!todo.done}
                        onClick={() => props.markerAsPending(todo)}></IconButon>
                    <IconButon style='danger' icon='trash-o' hide={!todo.done}
                        onClick={() => props.remove(todo)}></IconButon>
                </td>
            </tr>

        ))
    }

    return (

        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className='tableActions'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>)
}

const mapStateToProps = state => ({ list: state.todo.list })
const mapDispatchToProps = dispatch => bindActionCreators({ markerAsDone, markerAsPending, remove }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)