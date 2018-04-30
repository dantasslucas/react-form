import React from 'react'
import IconButon from '../template/iconButton'

export default props => {

    const renderRows = () =>{
        const list = props.list || []
        return list.map((todo,index) => (
            <tr key={index}>
                <td className={todo.done ? 'markedAsDone': ''}>{todo.description}</td>
                <td>
                    <IconButon style='success' icon='check' hide={todo.done}
                        onClick={() => props.handleMarkerAsDone(todo)}></IconButon>
                    <IconButon style='warning' icon='undo' hide={!todo.done}
                        onClick={() => props.handleMarkerAsPending(todo)}></IconButon>
                    <IconButon style='danger' icon='trash-o'  hide={!todo.done}
                        onClick={() => props.handleRemove(todo)}></IconButon>
                </td>
            </tr>
            
        ))
    }

    return(
        
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