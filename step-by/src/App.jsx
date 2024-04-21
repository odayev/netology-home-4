import { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

function App() {
  const [allTodos, setTodos] = useState ([]);
  const [newTitle, setNewTitle] = useState ('');
  const [newDescription, setNewDescription] = useState ('');
  const [currentEdit,setCurrentEdit] = useState("");
  const [currentEditedItem,setCurrentEditedItem] = useState("");

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
// ?????????????? I don't know 

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push (newTodoItem);
    setTodos (updatedTodoArr);
    localStorage.setItem ('todolist', JSON.stringify (updatedTodoArr));
  };

  const handleDeleteTodo = index => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice (index);

    localStorage.setItem ('todolist', JSON.stringify (reducedTodo));
    setTodos (reducedTodo);
  };

  useEffect(() => {
    let savedTodo = JSON.parse (localStorage.getItem ('todolist'));
    if (savedTodo) {
      setTodos (savedTodo);
    }
  }, []);

  const handleEdit = (ind,item)=>{
    console.log(ind);
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  }

  const handleUpdateTitle = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,title:value}
    })
  }

  const handleUpdateDescription = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,description:value}
    })
  }

  const handleUpdateToDo = ()=>{
    let newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setTodos(newToDo);
    setCurrentEdit("");
}



  return (
    <>
      <div className="container">
        <form className="form">
          <div className="box1">
            <label>Дата (ДД.ММ.ГГ)</label>
            <input
              type="date"
              name="name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="box2">
            <label>Пройдено км</label>
            <input
              type="text"
              name="km"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <button className="ok" onClick={handleAddTodo}>
            OK
          </button>
        </form>

        <ul className="info">
          <li>Дата (ДД.ММ.ГГ)</li>
          <li>Пройдено км</li>
          <li>Действие</li>
        </ul>

        <ul className="table">
          {allTodos.map((item, index) => {
            if (currentEdit === index) {
              return (
                <div className="edit-wrapper" key={index}>
                  <input
                    type="text"
                    value={currentEditedItem.title}
                    placeholder="Edit"
                    onChange={(e) => handleUpdateTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    value={currentEditedItem.description}
                    placeholder="Edit km"
                    onChange={(e) => handleUpdateDescription(e.target.value)}
                  />

                  <button className="ok" onClick={handleUpdateToDo}>
                    Update
                  </button>
                </div>
              );
            } else {
              return (
                <li key={index}>
                  <span>{item.title}</span>
                  <span>{item.description}</span>
                  <div>
                    <span>edit</span>
                    <AiOutlineDelete onClick={() => handleDeleteTodo(index)} />
                    <AiOutlineEdit onClick={() => handleEdit(index, item)} />
                  </div>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
