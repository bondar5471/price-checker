class UserPolicy < ApplicationPolicy
  def index?
    true
  end

  def create?
    user.aws?
  end
end
