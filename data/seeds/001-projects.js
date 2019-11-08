exports.seed = function(knex) {
    return knex('projects').insert([
      { name: 'Conquer Sprint Challenge', description: 'Doing it right meow', completed: 0}, // 1
      { name: 'Make Shelter Dog Website', description: 'All the woofers', completed: 0}, // 2
      { name: 'Create Weight Lifting App', description: 'Gonna be a Jacked O-Lantern for Halloween', completed: 0} // 3
    ]);
  };