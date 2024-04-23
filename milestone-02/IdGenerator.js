class IdGenerator {
    IdGenerator = null
    constructor() {
        if (this.IdGenerator === null) {
            this.IdGenerator = this
            this.project_id = 0
            this.task_id = 0
            this.pomodoro_id = 0
        }
        return ChangePage.ChangePage
    }

    generateProjectId() {
        return this.project_id++
    }
}

export default ChangePage