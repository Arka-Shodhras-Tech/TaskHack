import { Button, Text, Tooltip } from "@chakra-ui/react";
export const MyTasks = ({ tasks, day, unselect }) => {
  return (
    <div className="task-list">
      {tasks.Tasks?.[day]?.map((task, index) => (
        <div key={index} className="task-item">
          <div style={{ textAlign: "left" }}>
            <Text className="task-title" fontSize={["sm", "md", "lg"]}>
              Task : {task?.Task}
            </Text>
            <Text className="task-description" fontSize={["sm", "md", "lg"]}>
              <strong>Description</strong> : {task?.Desc}
            </Text>
            <Text fontSize={["sm", "md", "lg"]}>
              Score / Marks : {task?.GetMarks ? 
                            <Tooltip hasArrow label='Your Score' bg='gray.300' color='black'>

              <span>{task?.GetMarks}</span>
              </Tooltip>

              :
              
              
              
              <Tooltip hasArrow label='Not assigned' bg='gray.300' color='black'>
                              <span>_?_</span>

              </Tooltip>
              
              
              
              } /{" "}
              <span>{task?.Marks}</span>
            </Text>
          </div>
          <div className="task-select">
            {!task?.GetMarks && (
              <Button
                bg={"blanchedalmond"}
                onClick={() => unselect(task?.Task, day)}
              >
                UnSelect
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
