exports.seed = function(knex) {
    return knex('resources_per_project').insert([
      { project_id: 1, resource_id: 1, resource_amount: 'A metric crap-ton' }, // 1
      { project_id: 1, resource_id: 2, resource_amount: 'A metric crap-ton'}, // 2
      { project_id: 1, resource_id: 3, resource_amount: 'A metric crap-ton'}, // 3
    ]);
  };