import {combineReducers} from 'redux'

const rootReducers = () =>({
    todo:()=>({
        description:'Ler Livro',
        list:[{
            id:1,
            description:'Aprender React',
            done:true
        },{
            id:2,
            description:'Aprender Redux',
            done:false
        }]
    })
})

export default rootReducers