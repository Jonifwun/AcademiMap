import React from 'react'
import GroupTasks from './GroupTasks'

function GroupFeed() {
    return (
        <div>
            <GroupTasks data={[{id: 1, description: 'Task One'}, {id: 2, description: 'Task Two'}, {id: 3, description: 'Task Three'}]}/>
        </div>
    )
}

export default GroupFeed
