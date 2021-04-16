class ApplicationController < ActionController::Base
  include Pundit
  rescue_from ActiveRecord::RecordNotFound, JWT::DecodeError, with: :unauthorized
  rescue_from Pundit::NotAuthorizedError, with: :forbidden

  def current_user
    raise ActiveRecord::RecordNotFound unless request.headers['Authorization']

    authenticate_or_request_with_http_token do |token, _|
      @current_user ||= User.find_by!(sub: JsonWebToken.decode(token)[:sub])
    end
  end

  def unauthorized(exception)
    render_error exception, :unauthorized
  end

  def forbidden(exception)
    render_error exception, :forbidden
  end

  def render_error(exception, status)
    render json: { errors: exception.message }, status: status
  end
end
