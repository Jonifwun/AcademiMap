export const reducer = (state, action) => {
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
    if(action.type === 'REMOVE_TASK'){
        const newTasks = state.tasks.filter((task) => task.id !== action.payload)
        return {
            ...state,
            tasks: newTasks,
            isModalOpen: true,
            modalContent: 'Task Removed'
        } 
    }
}
