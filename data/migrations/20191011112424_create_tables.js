exports.up = function(knex) {
    return knex.schema
      .createTable('projects', tbl => {
          tbl.increments(); // unique id
          tbl.string('name', 255).notNullable().unique();
          tbl.text('description');
          tbl.boolean('completed').notNullable().defaultTo(0);
      })
  
      .createTable('resources', tbl => {
        tbl.increments(); // unique id
        
        tbl
            .integer('project_id')
            .unsigned()
            // .notNullable()
            .references('id') // this + below = attaches to foreign key
            .inTable('projects') // ^
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');

        tbl.string('name', 258).unique().notNullable();
        tbl.text('description');
      })    
  
      .createTable('tasks', tbl => {
          tbl.increments(); // unique id
  
          tbl
            .integer('project_id')
            .unsigned()
            .notNullable()
            .references('id') // this + below = attaches to foreign key
            .inTable('projects') // ^
            .onUpdate('CASCADE')
            .onDelete('RESTRICT');
            
          tbl.integer('task_number');
          tbl.string('description', 500).notNullable();
          tbl.text('notes');
          tbl.boolean('completed').notNullable().defaultTo(0);
      })

  .createTableIfNotExists('resources_per_project', tbl => {
    tbl.increments(); // unique id
    
    tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id') // this + below = attaches to foreign key
        .inTable('projects') // ^
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

    tbl 
        .integer('resource_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('resources')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')

    tbl.string('resource_amount', 258).notNullable();
  })

}

  
  exports.down = function(knex) {
    return knex.schema 
      .dropTableIfExists('resources_per_project')
      .dropTableIfExists('tasks')
      .dropTableIfExists('resources')
      .dropTableIfExists('projects');
  };