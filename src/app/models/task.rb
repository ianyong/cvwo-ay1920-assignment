class Task < ApplicationRecord
  # Associations
  belongs_to :user
  has_many :taggings
  has_many :tags, through: :taggings

  def self.tagged_with(name)
    Tag.find_by!(name: name).tasks
  end

  def self.tag_counts
    Tag.select('tags.*, count(taggings.tag_id) as count').joins(:taggings).group('taggings.tag_id')
  end

  def tag_list
    tags.map(&:name).join('; ')
  end

  def tag_list=(names)
    self.tags = names.map do |tag|
      Tag.where(name: tag.strip).first_or_create!
    end
  end
end
