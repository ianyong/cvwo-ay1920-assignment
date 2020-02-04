class Api::TagResource < JSONAPI::Resource
  attributes :name
  has_many :taggings
  has_many :tasks, through: :taggings

  def self.records(options = {})
    context = options[:context]
    context[:current_user].tags
  end
end