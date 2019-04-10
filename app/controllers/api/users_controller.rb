class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  
  def update
    user = User.find(params[:id])
    user.first_name = params[:first_name] ? params[:first_name] : user.first_name
    user.last_name = params[:name] ? params[:name] : user.last_name
    user.email = params[:email] ? params[:email] : user.email
    user.group = params[:group] ? params[:group] : user.group
    user.allergies = params[:allergies] ? params[:allergies] : user.allergies
    user.exceptions = params[:exceptions] ? params[:exceptions] : user.exceptions

    if user.save
      render json: user
    else
      render json: { errors: user.errors.full_message }, status: 422
    end

  end
end
