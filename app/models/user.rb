class User < ApplicationRecord
  validates :sub, presence: true, uniqueness: true

  enum role: { aws: 2, admin: 1, user: 0 }
end
