class Api::TaskResource < JSONAPI::Resource
  attributes :name, :description, :due_date, :is_completed
end