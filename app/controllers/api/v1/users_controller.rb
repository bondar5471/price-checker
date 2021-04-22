module Api
  module V1
    class UsersController < ApplicationController
      def create
        authorize current_user
        User.create(sub: params[:sub])
        head :ok
      end
    end
  end
end
