# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create({
  first_name: "CVWO",
  last_name: "User",
  email: "cvwo.assignment@gmail.com",
  password: "password"
})
Task.create([
  {
    user_id: "1",
    name: "Problem Set 1: Getting Started",
    description: "Introduction to Java",
    due_date: "20/01/2020",
    is_completed: true
  },
  {
    user_id: "1",
    name: "Problem Set 2: Load Balancing",
    description: "Binary search",
    due_date: "15/02/2020",
    is_completed: true
  },
  {
    user_id: "1",
    name: "Problem Set 3: The Sorting Detectives",
    description: "Sorting",
    due_date: "10/03/2020",
    is_completed: false
  },
  {
    user_id: "1",
    name: "Lab 1",
    description: "Finding maximum coverage of points using a unit circle.",
    due_date: "05/02/2020",
    is_completed: false
  },
  {
    user_id: "1",
    name: "Lab 2",
    description: "Cruise loader scheduling.",
    due_date: "24/02/2020",
    is_completed: false
  },
  {
    user_id: "1",
    name: "Movies Night",
    description: "Surprise movie",
    due_date: "02/03/2020",
    is_completed: false
  }
])
Tag.create([
  {
    user_id: "1",
    name: "NUS"
  },
  {
    user_id: "1",
    name: "Leisure"
  },
  {
    user_id: "1",
    name: "CS2030"
  },
  {
    user_id: "1",
    name: "CS2040S"
  }
])
Tagging.create([
  {
    tag_id: "1",
    task_id: "1"
  },
  {
    tag_id: "1",
    task_id: "2"
  },
  {
    tag_id: "1",
    task_id: "3"
  },
  {
    tag_id: "1",
    task_id: "4"
  },
  {
    tag_id: "1",
    task_id: "5"
  },
  {
    tag_id: "2",
    task_id: "6"
  },
  {
    tag_id: "3",
    task_id: "4"
  },
  {
    tag_id: "3",
    task_id: "5"
  },
  {
    tag_id: "4",
    task_id: "1"
  },
  {
    tag_id: "4",
    task_id: "2"
  },
  {
    tag_id: "4",
    task_id: "3"
  }
])