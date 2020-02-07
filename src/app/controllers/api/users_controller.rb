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
end
