import axios from 'axios'
const URL = 'http://localhost:8080/api/todos'

export const changeDescription = event => ({
    type: "DESCRIPTION_CHANGED",
    payload: event.target.value
})

export const search = () => {
    return(dispatch,getState) => {
        const description = getState().todo.description
        const request = axios.get(`${URL}/${description}`)
            .then(resp => dispatch({type:'TODO_SEARCHED', payload:resp.data.data}))
    }
    
  
}

export const add = description => {
    return dispatch => {
        axios.post(URL, { description })
            .then(resp => dispatch(clear()))
    }
}

export const markerAsDone = todo => {
    return dispatch =>
        axios.put(`${URL}/${todo.id}`, { ...todo, done: true })
            .then(resp => dispatch(search()))
}

export const markerAsPending = todo => {
    return dispatch =>
        axios.put(`${URL}/${todo.id}`, { ...todo, done: false })
            .then(resp => dispatch(search()))
}

export const remove = todo => {
    return dispatch =>
        axios.delete(`${URL}/${todo.id}`)
            .then(resp => dispatch(search()))
}

export const clear = () => {
    return [{type:'TODO_CLEAR'},search()]
}

























