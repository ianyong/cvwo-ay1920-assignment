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
      response = { message: 'User created successfully'}
      render json: response, status: :created
    else
      render json: @user.errors, status: :bad
    end
  end

  def set_filters
    @user = context[:current_user]
    @user.tags_filter = params[:tags_filter]
    if @user.save
      render json: { message: 'Tags filter saved successfully' }, status: 200
    else
      render json: @user.errors, status: 400
    end
  end

  def get_filters
    render json: { tags_filter: context[:current_user].tags_filter }, status: 200
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
      render json: { error: command.errors }, status: :four_zero_one
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
