class Api::UsersController < ApiController
  # Skip authorization for login and register
  skip_before_action :authenticate_request, only: %i[login register]

  def login
    authenticate params[:email], params[:password]
  end

  def register
    @user = User.create(user_params)
    @user.tags_filter = ""
    if @user.save
      command = AuthenticateUser.call(params[:email], params[:password])
      response = { message: 'User created successfully', access_token: command.result }
      render json: response, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def set_filters
    @user = context[:current_user]
    @user.tags_filter = params[:tags_filter].gsub("\u0000", "\u001F")
    if @user.save
      render json: { message: 'Tags filter saved successfully' }, status: 200
    else
      render json: @user.errors, status: 400
    end
  end

  def get_filters
    render json: { tags_filter: context[:current_user].tags_filter.gsub("\u001F", "\u0000") }, status: 200
  end

  def get_user_details
    @user = context[:current_user]
    render json: {
      data: {
        first_name: @user.first_name,
        last_name: @user.last_name,
        email: @user.email
      }
    }, status: 200
  end

  def update_user_details
    @user = context[:current_user]

    command = AuthenticateUser.call(@user.email, params[:current_password])
    if command.success?
      @user.first_name = params[:first_name]
      @user.last_name = params[:last_name]
      @user.email = params[:email]
      if @user.save
        render json: { message: "Successfully updated user" }, status: 200
      else
        render json: { error: "Unable to save user details" }, status: 400
      end
    else
      render json: { error: "Invalid password" }, status: 400
    end
  end

  def update_password
    @user = context[:current_user]

    command = AuthenticateUser.call(@user.email, params[:current_password])
    if command.success?
      @user.password = params[:new_password]
      if @user.save
        render json: { message: "Successfully updated password" }, status: 200
      else
        render json: { error: "Unable to save password" }, status: 400
      end
    else
      render json: { error: "Invalid password" }, status: 400
    end
  end

  private

  def authenticate(email, password)
    command = AuthenticateUser.call(email, password)

    if command.success?
      render json: {
        access_token: command.result,
        message: 'Login Successful'
      }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
   end

  def user_params
    params.permit(
      :first_name,
      :last_name,
      :email,
      :password,
    )
  end

  def tags_params
    params.permit(
      :tags_filter
    )
  end

  def update_user_params
    params.permit(
      :first_name,
      :last_name,
      :email,
      :new_password,
      :current_password
    )
  end
end
