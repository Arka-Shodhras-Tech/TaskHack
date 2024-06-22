import { Button } from "@chakra-ui/react"
export const MyTasks = ({ tasks, day, unselect }) => {
    return (
        <div className="task-list">
            {
                tasks.Tasks?.[day]?.map((task, index) => (
                    <div key={index} className="task-item">
                        <div>
                            <div className="task-title">{task?.Task}</div>
                            <div className="task-description">{task?.Desc}</div>
                        </div>
                        <div className='task-select'>
                            <Button bg={"blanchedalmond"} onClick={() => unselect(task?.Task, day)}>UnSelect</Button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}