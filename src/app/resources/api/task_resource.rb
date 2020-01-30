class Api::TaskResource < JSONAPI::Resource
  attributes :user_id, :name, :description, :due_date, :is_completed

  def self.records(options = {})
    context = options[:context]
    context[:current_user].tasks
  end

  filter :until_date, apply: ->(records, value, _options) {
    records.where('due_date <= ?', value[0]);
  }

  filter :is_completed
end