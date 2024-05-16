let addProject = async(name) => {
    await fetch()

}

let addTask = async(project, name, date) => {

}

let deleteProject = async(project) => {

}

let deleteTask = async(project, task) => {
    let ret = await fetch(`http://127.0.0.1:3260/removeTask?project=${project}&task=${task}`, {
                method: 'DELETE',
            })
    let ret2 = await ret.json();
    return ret2;

}

let getProjects = async() => {
    let ret = await fetch('http://127.0.0.1:3260/projects');
    let ret2 = await ret.json();
    return ret2;
}