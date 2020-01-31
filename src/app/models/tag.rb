class Tag < ApplicationRecord
  validates :name, uniqueness: { case_sensitive: false }
  has_many :taggings
  has_many :tasks, through: :taggings
end
