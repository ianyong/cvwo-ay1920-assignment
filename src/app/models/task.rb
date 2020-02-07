class Task < ApplicationRecord
  # Associations
  belongs_to :user
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings

  def self.tagged_with(name)
    Tag.find_by!(name: name).tasks
  end

  def self.tag_counts
    Tag.select('tags.*, count(taggings.tag_id) as count').joins(:taggings).group('taggings.tag_id')
  end

  def tag_list
    tags.map(&:name).join("\u0000")
  end

  def set_tag_list(names, user_id)
    previous_tags = tag_list.split("\u0000")

    # Update tags
    self.tags = names.map do |name|
      name = name.strip
      tag = Tag.where('lower(name) = ? and user_id = ?', name.downcase, user_id).first
      tag ||= Tag.create(name: name, user_id: user_id)
    end

    # Remove instances of tags with no references left
    previous_tags.map do |name|
      tag = Tag.where(name: name, user_id: user_id).first
      if not Tagging.exists?(tag_id: tag[:id])
        tag.destroy
      end
    end
  end
end
