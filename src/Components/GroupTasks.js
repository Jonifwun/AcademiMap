import { Card } from '@material-ui/core'
import React, { useState, useReducer } from 'react'
import TaskModal from './TaskModal'

function GroupTasks({data}) {

    const reducer = (state, action) => {
        if(action.type === 'ADD_TASK'){
            const newTasks = [...state.tasks, action.payload]
            return {
                ...state,
                tasks: newTasks,
                isModalOpen: true,
                modalContent: 'Task Added'
             }
        }
        if(action.type === 'NO_TASK'){
            return {...state, isModalOpen: true, modalContent: 'No value entered'}
        }
        if(action.type === 'CLOSE_MODAL'){
            return {...state, isModalOpen: false}
        }
    }

    const defaultState = {
        tasks: [],
        isModalOpen: false,
        modalContent: 'Hello World'
    }
    
    const [taskName, setTaskName] = useState('') 

    const [state, dispatch] = useReducer(reducer, defaultState)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(taskName){
            const newTask = {id: new Date().getTime().toString(), taskName}
            dispatch({type: 'ADD_TASK',  payload: newTask})
            setTaskName('')
        } else {
            dispatch({type: 'NO_TASK'})
        }

    }

    const closeModal = () => {
        dispatch({type: 'CLOSE_MODAL'})
    }

    return (
        <Card style={{marginTop: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '650px'}}>
            { state.isModalOpen && <TaskModal modalContent={state.modalContent} closeModal={ closeModal }/>}
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignContent:'center'}}>
                <div>
                    <input 
                        type='text' 
                        value={ taskName }
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </div>
                <button type='submit'>Add</button>
            </form>
            {state.tasks.map((task) => {
                return (
                    <div key={task.id}>
                        <h4>{task.taskName}</h4>
                        <button onClick={() => dispatch({type: 'REMOVE_TASK', payload: task.id}) }>Delete</button>
                    </div>
                )
            })}
        </Card>
    )
}

export default GroupTasks
