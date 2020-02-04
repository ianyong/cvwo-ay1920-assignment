class Tag < ApplicationRecord
  validates :name, uniqueness: { case_sensitive: false, scope: :user_id }
  belongs_to :user
  has_many :taggings
  has_many :tasks, through: :taggings
end
