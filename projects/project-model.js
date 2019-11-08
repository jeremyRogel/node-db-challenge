const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findResources,
    findTasks,
    addProject,
    addResource,
    addTask,
    update,
    remove,
    removeResource, 
    removeTask
}

function find() {
    return db('projects');
};

function findById(id) {
    return db('projects')
        .where({ id })
        .first();
};

function findResources(projectId) {
    return db('resources')
        .join('projects', 'projects.id', 'resources.project_id')
        .select('projects.name', 'resources.id', 'resources.name', 'resources.description')
        .where({ project_id: projectId });
};

function findTasks(projectId) {
    return db('tasks')
        .join('projects', 'projects.id', 'tasks.project_id')
        .select('projects.name', 'tasks.id', 'tasks.task_number', 'tasks.description', 'tasks.notes')
        .where({ project_id: projectId })
};

function addProject(project) {
    return db('projects') 
        .insert(project, 'id')
        .then(([id]) => {
            return findById(id);
        });
};

function addResource(resource, project_id) {
    return db('resources') 
    .insert(resource, project_id)
};

function addTask(task, project_id) {
    return db('tasks')
    .insert(task, project_id)
};

function update(changes, id) {
    return db('projects') 
        .where('id', Number(id))
        .update(changes);
};

function remove(id) {
    return db('projects')
    .where('id', Number(id))
    .delete();
};

function removeResource(id) {
    return db('resources')
    .where('id', Number(id))
    .delete();
}

function removeTask(id) {
    return db('resources')
    .where('id', Number(id))
    .delete();
}