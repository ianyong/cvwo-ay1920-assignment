class Api::TaskResource < JSONAPI::Resource
  attributes :user_id, :name, :description, :due_date, :is_completed
  has_many :taggings
  has_many :tags, through: :taggings

  def self.tagged_with(name)
    Tag.find_by!(name: name).tasks
  end

  def self.tagged_counts
    Tag.select('tags.*, count(taggings.tag_id) as count').joins(:taggings).group('taggings.tag_id')
  end

  def tag_list
    tags.map(&:name).join(', ')
  end

  def tag_list=(names)
    self.tags = names.split(',').map do |n|
      Tag.where(name: n.strip).first_or_create!
    end
  end

  def self.records(options = {})
    context = options[:context]
    context[:current_user].tasks
  end

  filter :until_date, apply: ->(records, value, _options) {
    records.where('due_date <= ?', value[0]);
  }

  filter :is_completed
end