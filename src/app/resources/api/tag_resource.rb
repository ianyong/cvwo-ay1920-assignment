class Api::TagResource < JSONAPI::Resource
  attributes :name
  has_many :taggings
  has_many :tasks, through: :taggings
end