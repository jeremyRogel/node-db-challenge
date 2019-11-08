exports.seed = function(knex) {
    return knex('resources').insert([
      { name: 'Brain and 5+ Years of Spreadsheet Experience', description: 'Is it weird I think this is fun?'}, // 1
      { name: 'Photos of Approximately 100 Dogs I Have Wakled', description: 'Go look at the cuties on my FB!'}, // 2
      { name: 'Extensive Fitness Background and Workout Programming Know-how', description: 'If food would stop tasting so good, I might have visible abs by now.'} // 3
    ]);
  };