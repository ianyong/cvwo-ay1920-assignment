# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Task.create([
  {
    name: "Task 1",
    description: "This is a description.",
    due_date: "18/03/2020",
    is_completed: false
  },
  {
    name: "Task 2",
    description: "lorem ipsum",
    due_date: "01/01/2020",
    is_completed: true
  },
  {
    name: "Task 3",
    description: "The quick brown fox jumped over the fence.",
    due_date: "28/02/2020",
    is_completed: false
  }
])