import axios from 'axios'

export default class ToDoService {
    static async getAll() {
        const response = await axios.get("http://localhost:1337/api/to-dos")
        return response
    }

    static async setTask(title, description, status) {
        const task = {
            data: {
                title, 
                description, 
                status
            }
        }
        const response = await axios.post("http://localhost:1337/api/to-dos", task)
        return response
    }
}