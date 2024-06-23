import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./ToDo.module.css";
import {
  Button,
  Divider,
  Input,
  Modal,
  message,
  Tag,
  Tooltip,
  Select,
  Empty,
} from "antd";
import { getErrorMessage } from "../../util/GetError";
import { getUserDetails } from "../../util/GetUser";
import ToDoServices from "../../services/toDoServices";
import { useNavigate } from "react-router";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";

function ToDoList() {
  const getFormattedDate = (value) => {
    let date = new Date(value);
    let dateString = date.toDateString();
    let hh = date.getHours();
    let min = date.getMinutes();
    let ss = date.getSeconds();
    let finalDate = `${dateString} at ${hh}:${min}:${ss}`;
    return finalDate;
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allToDo, setAllToDo] = useState([]);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [currentTaskType, setCurrentTaskType] = useState("incomplete");
  const [completedTodo, setCompletedTodo] = useState([]);
  const [incompletedTodo, setIncompletedTodo] = useState([]);
  const [currentTodoTask, setCurrentTodoTask] = useState([]);
  const [filteredTodo, setFilteredTodo] = useState([]);
  const navigate = useNavigate();

  const getAllToDo = async () => {
    try {
      let user = getUserDetails();
      console.log(user?.userId);
      const response = await ToDoServices.getAllToDo(user?.userId);
      console.log(response.data);
      setAllToDo(response.data);
    } catch (error) {
      console.log(error);
      message.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    let user = getUserDetails();
    const getAllToDo = async () => {
      try {
        console.log(user?.userId);
        const response = await ToDoServices.getAllToDo(user?.userId);
        console.log(response.data);
        setAllToDo(response.data);
      } catch (error) {
        console.log(error);
        message.error(getErrorMessage(error));
      }
    };
    if (user && user?.userId) {
      getAllToDo();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const incomplete = allToDo.filter((item) => !item.isCompleted);
    const complete = allToDo.filter((item) => item.isCompleted);
    setIncompletedTodo(incomplete);
    setCompletedTodo(complete);
    if (currentTaskType === "incomplete") {
      setCurrentTodoTask(incomplete);
    } else {
      setCurrentTodoTask(complete);
    }
  }, [allToDo, currentTaskType]);

  const handleEdit = (item) => {
    console.log(item);
    setCurrentEditItem(item);
    setUpdatedTitle(item?.title);
    setUpdatedDescription(item?.description);
    setUpdatedStatus(item?.isCompleted);
    setIsEditing(true);
  };

  const handleDelete = async (item) => {
    try {
      const response = await ToDoServices.deleteToDo(item._id);
      console.log(response.data);
      message.success(`${item.title} is Deleted successfully!`);
      getAllToDo();
    } catch (error) {
      console.log(error);
      message.error(getErrorMessage(error));
    }
  };

  const handleUpdateStatus = async (id, status) => {
    console.log(id);
    try {
      const response = await ToDoServices.updateToDo(id, {
        isCompleted: status,
      });
      message.success("Task Status Updated Successfully!");
      console.log(response.data);
      getAllToDo();
    } catch (error) {
      console.log(error);
      message.error(getErrorMessage(error));
    }
  };

  const handleUpdateTask = async () => {
    setLoading(true);
    try {
      const data = {
        title: updatedTitle,
        description: updatedDescription,
        isCompleted: updatedStatus,
      };
      console.log(data);
      const response = await ToDoServices.updateToDo(
        currentEditItem?._id,
        data
      );
      console.log(response.data);
      message.success(`${currentEditItem?.title} Updated Successfully!!!`);
      setLoading(false);
      setIsEditing(false);
      getAllToDo();
    } catch (error) {
      console.log(error);
      setLoading(false);
      message.error(getErrorMessage(error));
    }
  };

  const handleSubmitTask = async () => {
    setLoading(true);
    try {
      const userId = getUserDetails()?.userId;
      const data = {
        title,
        description,
        isCompleted: false,
        createdBy: userId,
      };
      const response = await ToDoServices.createToDo(data);
      console.log(response.data);
      setLoading(false);
      message.success("To Do Task Added Successfully!!!");
      setIsAdding(false);
      getAllToDo();
    } catch (error) {
      console.log(error);
      setLoading(false);
      message.error(getErrorMessage(error));
    }
  };

  const handleTypeChange = (value) => {
    console.log(value);
    setCurrentTaskType(value);
    if (value === "incomplete") {
      setCurrentTodoTask(incompletedTodo);
    } else {
      setCurrentTodoTask(completedTodo);
    }
  };

  const handleSearch = (e) => {
    let query = e.target.value;
    let filteredList = allToDo.filter((item) =>
      item.title.toLowerCase().match(query.toLowerCase())
    );
    if (filteredList.length > 0 && query) {
      setFilteredTodo(filteredList);
    } else {
      setFilteredTodo([]);
    }
  };

  return (
    <>
      <Navbar active={"myTask"} />
      <section className={styles.toDoWrapper}>
        <div className={styles.toDoHeader}>
          <h2>Your Tasks</h2>
          <Input
            style={{ width: "50%" }}
            onChange={handleSearch}
            placeholder="Search Your Task Here..."
          />
          <div>
            <Button
              onClick={() => setIsAdding(true)}
              type="primary"
              size="large"
            >
              Add Task
            </Button>
            <Select
              value={currentTaskType}
              style={{ width: 180, marginLeft: "10px" }}
              onChange={handleTypeChange}
              size="large"
              options={[
                { value: "incomplete", label: "Incomplete" },
                { value: "complete", label: "Complete" },
              ]}
            />
          </div>
        </div>
        <Divider></Divider>

        <div className={styles.toDoListCardWrapper}>
          {filteredTodo.length > 0
            ? filteredTodo.map((item) => {
                return (
                  <div key={item?._id} className={styles.toDoCard}>
                    <div>
                      <div className={styles.toDoCardHeader}>
                        <h3>{item?.title}</h3>
                        {item?.isCompleted ? (
                          <Tag color="cyan">Completed</Tag>
                        ) : (
                          <Tag color="red">Incomplete</Tag>
                        )}
                      </div>
                      <p>{item?.description}</p>
                    </div>

                    <div className={styles.toDoCardFooter}>
                      <Tag>{getFormattedDate(item?.createdAt)}</Tag>
                      <div className={styles.toDoFooterAction}>
                        <Tooltip title="Edit Task?">
                          <EditOutlined
                            onClick={() => handleEdit(item)}
                            className={styles.actionIcon}
                          />
                        </Tooltip>
                        <Tooltip title="Delete Task?">
                          <DeleteOutlined
                            onClick={() => handleDelete(item)}
                            style={{ color: "red" }}
                            className={styles.actionIcon}
                          />
                        </Tooltip>
                        {item?.isCompleted ? (
                          <Tooltip title="Mark as Incomplete">
                            <CheckCircleOutlined
                              onClick={() =>
                                handleUpdateStatus(item._id, false)
                              }
                              className={styles.actionIcon}
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Mark as Complete">
                            <CheckCircleFilled
                              onClick={() => handleUpdateStatus(item._id, true)}
                              style={{ color: "green" }}
                              className={styles.actionIcon}
                            />
                          </Tooltip>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            : currentTodoTask > 0 ? currentTodoTask.map((item) => {
              return (
                <div key={item?._id} className={styles.toDoCard}>
                  <div>
                    <div className={styles.toDoCardHeader}>
                      <h3>{item?.title}</h3>
                      {item?.isCompleted ? (
                        <Tag color="cyan">Completed</Tag>
                      ) : (
                        <Tag color="red">Incomplete</Tag>
                      )}
                    </div>
                    <p>{item?.description}</p>
                  </div>

                  <div className={styles.toDoCardFooter}>
                    <Tag>{getFormattedDate(item?.createdAt)}</Tag>
                    <div className={styles.toDoFooterAction}>
                      <Tooltip title="Edit Task?">
                        <EditOutlined
                          onClick={() => handleEdit(item)}
                          className={styles.actionIcon}
                        />
                      </Tooltip>
                      <Tooltip title="Delete Task?">
                        <DeleteOutlined
                          onClick={() => handleDelete(item)}
                          style={{ color: "red" }}
                          className={styles.actionIcon}
                        />
                      </Tooltip>
                      {item?.isCompleted ? (
                        <Tooltip title="Mark as Incomplete">
                          <CheckCircleOutlined
                            onClick={() =>
                              handleUpdateStatus(item._id, false)
                            }
                            className={styles.actionIcon}
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Mark as Complete">
                          <CheckCircleFilled
                            onClick={() => handleUpdateStatus(item._id, true)}
                            style={{ color: "green" }}
                            className={styles.actionIcon}
                          />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              );
            }) : <div className={styles.noTaskWrapper}>
              <Empty />
            </div> }
        </div>

        <Modal
          confirmLoading={loading}
          title="Add New To Do Task"
          open={isAdding}
          onOk={handleSubmitTask}
          onCancel={() => setIsAdding(false)}
        >
          <Input
            style={{ marginBottom: "1rem" }}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input.TextArea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Modal>

        <Modal
          confirmLoading={loading}
          title={`Update ${currentEditItem?.title}`}
          open={isEditing}
          onOk={handleUpdateTask}
          onCancel={() => setIsEditing(false)}
        >
          <Input
            style={{ marginBottom: "1rem" }}
            placeholder="Updated Title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <Input.TextArea
            style={{ marginBottom: "1rem" }}
            placeholder="Updated Description"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />

          <Select
            onChange={(value) => setUpdatedStatus(value)}
            value={updatedStatus}
            options={[
              {
                value: false,
                label: "Not Completed",
              },
              {
                value: true,
                label: "Completed",
              },
            ]}
          ></Select>
        </Modal>
      </section>
    </>
  );
}

export default ToDoList;
