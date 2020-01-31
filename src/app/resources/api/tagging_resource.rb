class Api::TaggingResource < JSONAPI::Resource
  attributes :tag_id, :task_id
  has_one :tag
  has_one :task
end