class Api::TaskResource < JSONAPI::Resource
  attributes :user_id, :name, :description, :due_date, :is_completed, :tag_list
  has_many :taggings
  has_many :tags, through: :taggings

  def self.records(options = {})
    # Return only logged in user's tasks
    context = options[:context]
    @tasks = context[:current_user].tasks

    # Apply tags filter
    tags_filter = context[:current_user].tags_filter
    unless tags_filter.nil? || tags_filter.empty?
      @tasks = @tasks.includes(:tags).where("tags.id in (?)", tags_filter.split(";").map(&:to_i));
    end

    return @tasks
  end

  filter :until_date, apply: ->(records, value, _options) {
    records.where('due_date <= ?', value[0]);
  }

  filter :remove_old, apply: ->(records, value, _options) {
    records.where('is_completed = false or due_date > ?', Date.today);
  }
end