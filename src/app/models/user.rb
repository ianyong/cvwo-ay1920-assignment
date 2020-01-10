class User < ApplicationRecord
  # Validations
  validates_presence_of :first_name, :last_name, :email, :password_digest
  validates :email, uniqueness: true

  # Encrypt password
  has_secure_password
end
