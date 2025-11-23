import React, { useEffect, useState } from 'react'
import axios from '../api/axiosInstance'
import TaskCard from '../components/TaskCard'
import { Link, useSearchParams } from 'react-router-dom'

export default function TaskList() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  // Get search query from URL
  const [searchParams] = useSearchParams()



  const searchQuery = searchParams.get("search") || ""

  const fetchTasks = async () => {
    try {
      let res;
      if (searchQuery) {
        res = await axios.get(`/tasks/search/${searchQuery}`)
        setTasks(res.data.result)
      } else {
        res = await axios.get('/tasks')
        setTasks(res.data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTasks() }, [searchQuery])

  const handleDelete = async (id) => {
    if (!confirm('Delete task?')) return
    try {
      await axios.delete(`/tasks/${id}`)
      setTasks(tasks.filter(t => t._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div className="center">Loading...</div>

  return (
    <div>
      <div className="page-header">
        <h2>Your Tasks</h2>
        <Link to="/tasks/add" className="btn">Add Task</Link>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="tasks-grid">
          {tasks.map(t => (
            <TaskCard key={t._id} task={t} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
