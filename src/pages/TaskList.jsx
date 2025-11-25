import React, { useEffect, useState , useMemo} from 'react'
import axios from '../api/axiosInstance'
import TaskCard from '../components/TaskCard'
import { Link, useSearchParams } from 'react-router-dom'

export default function TaskList() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  //states to manage filters
  const [Filter, setFilter] = useState('')

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


  // Filter tasks based on priority
   const filteredTasks = useMemo(() => {
    if (Filter === '') return tasks
    return tasks.filter(task => task.priority === Filter)
  }, [tasks, Filter])

  if (loading) return <div className="center">Loading...</div>

  return (
        <div>
      <div className="page-header">
        <div className="page-header-left">
          <h2>Your Tasks</h2>
        </div>

        <div className="page-header-right">
          {/* Priority Filter */}
          <select
            className="priority-filter"
            value={Filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Filter Results</option>

            {/* <option value="">All</option> */}
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <Link to="/tasks/add" className="btn">Add Task</Link>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map(t => (
            <TaskCard key={t._id} task={t} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
