exports.seed = function(knex) {
    return knex('tasks').insert([
      { project_id: 1, task_number: 1, description: 'Type stuff here and seed data', notes: 'And then do the API requests so I can log-off and go read a book', completed: 0}, // 1
      { project_id: 2, task_number: 2, description: 'Somehow find time to work on it', notes: 'And then make a component that allows shelters to post dog info with a photo', completed: 0}, // 2
      { project_id: 3, task_number: 3, description: 'Make a functional back-end', notes: 'And then populate it with all the relevant workout data serious lifters care about', completed: 0} // 3
    ]);
  };