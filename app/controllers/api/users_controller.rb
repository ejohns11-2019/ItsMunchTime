class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: User.all
  end

  def show
    render json: User.find(params[:id])
  end

  def update
    user = User.find(params[:id])
    user.first_name = params[:first_name] ? params[:first_name] : user.first_name
    user.last_name = params[:last_name] ? params[:last_name] : user.last_name
    user.email = params[:email] ? params[:email] : user.email
    user.group = params[:group] ? params[:group] : user.group
    user.allergies = params[:allergies] ? params[:allergies] : user.allergies
    user.exceptions = params[:exceptions] ? params[:exceptions] : user.exceptions
    user.admin = params[:admin] ? params[:admin] : user.admin

    #image = params[:image]

    # if image
    #   begin
    #     ext = Image.extname(image.tempfile)
    #     cloud_image = Cloudinary::Uploader.upload(image, public_id: image.original_filename, secure: true)
    #     user.image = cloud_image['secure_url']
    #   rescue => e
    #     render json: {errors: e}, status: 422
    #   end
    # end

    if user.save
      render json: user
    else
      render json: { errors: user.errors.full_message }, status: 422
    end

  end

  def userhistory
    @user= Order.find_by(user_id: current_user.id, current: true)
    if @user.current == true
      render json: @user
    else
      render json: { errors: @user.errors.full_message }, status: 422
    end
  end
end
