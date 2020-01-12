class User < ApplicationRecord
  # Associations
  has_many :tasks, dependent: :destroy

  # Validations
  validates_presence_of :first_name, :last_name, :email, :password_digest
  validates :email, uniqueness: true

  # Encrypt password
  has_secure_password
end
