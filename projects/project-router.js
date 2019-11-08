const express = require('express');

const Projects = require('./project-model');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.find() 
    .then(projects => 
        {
            const completedProjects = projects.map(project => {
                if (project.completed === 0) project.completed = false
                else if (project.completed === 1) project.completed = true
                return project;
            })
            res.status(200).json(completedProjects)
        })
    .catch(err => res.status(500).json({ message: err }))
});

router.get('/:id', (req, res) => {
    Projects.findById(req.params.id) 
    .then(project => {
        if (project) {
            res.json(project);
            if (project.completed === 1) return 'true'
            else return 'false'
        } else {
            res.status(404).json({ message: 'No such project' })
        }
    })
    .catch(err => res.status(500).json({ message: err }))
})

router.get('/:id/resources', (req, res) => {
    Projects.findResources(req.params.id)
    .then(resources => res.json(resources))
    .catch(err => res.status(500).json({ message: err }))
})

router.get('/:id/tasks', (req, res) => {
    Projects.findTasks(req.params.id) 
    .then(tasks => {
        if (tasks.length) {
            const completedTasks = tasks.map(task => {
                if (task.completed === 0) task.completed = false
                else if (task.completed === 1) task.completed = true
                return task;
            })
            res.status(200).json(completedTasks)
        } 
        else {
            res.status(404).json({ message: 'No such task' })
        }
    })
    .catch(err => res.status(500).json({ message: err }))
});

router.post('/', (req, res) => {
    const projectData = req.body;

    Projects.addProject(projectData)
    .then(project => res.status(201).json(project))
    .catch(err => res.status(500).json({ message: err }))
});

router.post('/:id/resources', (req, res) => {
    const resourceData = req.body;

    Projects.findById(req.params.id) 
    .then(project => {
        if (project) {
            Projects.addResource(resourceData, req.params.id)
            .then(resource => res.status(201).json(resource))
        } else {
            res.status(404).json({ message: 'No such project' })
        }
    })
    .catch(err => res.status(500).json({ message: err }))
})

router.post('/:id/tasks', (req, res) => {
    const taskData = req.body;

    Projects.findById(req.params.id) 
    .then(project => {
        if (project) {
            Projects.addTask(taskData, req.params.id)
            .then(task => res.status(201).json(task))
        } else {
            res.status(404).json({ message: 'No such project' })
        }
    })
    .catch(err => res.status(500).json({ message: err }))
})

router.put('/:id', (req, res) => {
    Projects.findById(req.params.id) 
    .then(project => {
        if (project) {
            Projects.update(req.body, req.params.id)
            .then(updatedProject => res.json(updatedProject))
        } else {
            res.status(404).json({ message: 'No such project' })
        }
    })
    .catch(err => res.status(500).json({ message: err }))
})

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then(deleted => res.json({ removed: deleted }))
    .catch(err => res.status(500).json({ message: err }))
})

router.delete('/:id/resources/:id', (req, res) => {
    Projects.findById(req.params.id) 
    .then(project => {
        if (project) {
            Projects.removeResource(req.params.id)
            .then(deleted => res.json({ removed: deleted }))
            .catch(err => res.status(500).json({ message: err }))
        } else {
            res.status(404).json({ message: 'No such project' })
        }
    })
})

router.delete('/:id/tasks/:id', (req, res) => {
    Projects.findById(req.params.id) 
    .then(project => {
        if (project) {
            Projects.removeTask(req.params.id)
            .then(deleted => res.json({ removed: deleted }))
            .catch(err => res.status(500).json({ message: err }))
        } else {
            res.status(404).json({ message: 'No such project' })
        }
    })
})

module.exports = router;