import { Button } from "@chakra-ui/react";
export const MyTasks = ({ tasks, day, unselect }) => {
  return (
    <div className="task-list">
      {
        tasks?.Tasks?.[day]?.map((task, index) => (
          <div key={index} className="task-item">
            <div>
              <div className="task-title">Task : {task?.Task}</div>
              <div className="task-description"><strong>Description</strong> : {task?.Desc}</div>
              {/* <div >Marks : {task?.GetMarks}/{task?.Marks}</div> */}
            </div>
            <div className='task-select'>
              {task?.GetMarks ? (task?.GetMarks + "/" + task?.Marks) : <Button bg={"blanchedalmond"} onClick={() => unselect(task?.Task, day)}>UnSelect</Button>}
            </div>
          </div>
        ))
      }
    </div>
  )
}