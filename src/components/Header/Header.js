import "./style.css"
import { nanoid } from 'nanoid'
import { useState, useEffect } from "react"

function Header() {
    const [todo, setTodo] = useState("")
    const [todoArr, setTodoArr] = useState([])
    const [filterArr, setFilterArr] = useState([])
    const [selectedBtn, setSelectedBtn] = useState("all")

    let leftCount = todoArr.filter((item) => !item.completed).length

    const onChangeInput = ((e) => {
        setTodo(e.target.value)
    })

    const handleSubmit = () => {
        if (todo) {
            setTodoArr([...todoArr, { id: nanoid(), title: todo, completed: false }])
            setTodo("")
        } else {
            alert("Todo Giriniz..")
        }
    }

    const handleCompelete = (id) => {
        setTodoArr(todoArr.map((item) => {
            if (item.id === id) {
                return { ...item, completed: !item.completed }
            }
            return item
        }))
    }

    const handleReset = () => {
        setTodoArr([])
    }

    const handleDelete = (id) => {
        setTodoArr(todoArr.filter((item) => item.id !== id))
    }

    const handleFilterAll = (e) => {
        setSelectedBtn(e.target.value)
    }

    const handleFilterCompleted = (e) => {
        setSelectedBtn(e.target.value)
    }

    const handleFilterNotCompleted = (e) => {
        setSelectedBtn(e.target.value)
    }

    useEffect(() => {
        if (selectedBtn === "all") {
            setFilterArr(todoArr)
        }
        if (selectedBtn === "completed") {
            setFilterArr(todoArr.filter((item) => item.completed))
        }
        if (selectedBtn === "notCompleted") {
            setFilterArr(todoArr.filter((item) => !item.completed))
        }
    }, [todoArr, selectedBtn])


    return (
        <>
            <div className="container">
                <form className="input" onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit()
                }}>
                    <input className="todo" name="todo" value={todo} onChange={(e) => {
                        onChangeInput(e)
                    }} >
                    </input>
                </form>
                <ul>
                    {filterArr.map((item) => {
                        return (
                            <div key={item.id} className="item" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "500px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}> <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: item.completed ? "green" : "white", border: "0" }} onClick={() => handleCompelete(item.id)}></div>
                                    <li style={{ listStyle: "none", textDecoration: item.completed ? "line-through" : "none" }}>{item.title}
                                    </li></div>
                                <button  onClick={() => {
                                    handleDelete(item.id)
                                }}
                                >X</button>
                            </div>
                        )
                    })}
                </ul>
                
                <button value="all" onClick={(e) => { handleFilterAll(e) }}>All   </button>
                <button value="completed" onClick={(e) => { handleFilterCompleted(e) }}>completed</button>
                <button value="notCompleted" onClick={(e) => { handleFilterNotCompleted(e) }}>notcompleted</button>
                <br/>
                <span style={{display: "flex", justifyContent: "space-between", alignItems:"center",paddingLeft:"5px", fontFamily: "ariel"}}>{leftCount}left<button  onClick={handleReset}>Hepsini sil</button></span>
            </div>
        </>
    )
}

export default Header