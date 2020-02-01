class Api::TaskResource < JSONAPI::Resource
  attributes :user_id, :name, :description, :due_date, :is_completed, :tag_list
  has_many :taggings
  has_many :tags, through: :taggings

  def self.records(options = {})
    context = options[:context]
    context[:current_user].tasks
  end

  filter :until_date, apply: ->(records, value, _options) {
    records.where('due_date <= ?', value[0]);
  }

  filter :remove_old, apply: ->(records, value, _options) {
    records.where('is_completed = false or due_date > ?', Date.today);
  }
end