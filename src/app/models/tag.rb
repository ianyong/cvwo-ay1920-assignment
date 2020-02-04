class Tag < ApplicationRecord
  validates :name, uniqueness: { case_sensitive: false }
  belongs_to :user
  has_many :taggings
  has_many :tasks, through: :taggings
end
