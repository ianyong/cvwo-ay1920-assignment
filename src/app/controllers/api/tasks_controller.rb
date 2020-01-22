class Api::TasksController < ApiController
  def create
    @task = Task.new(task_params)
    @task.is_completed = false
    @task.user_id = context[:current_user].id
    if @task.save
      render json: @task, status: 200
    else
      render json: { error: 'Unable to create task' }, status: 400
    end
  end

  private

  def task_params
    params.permit(
      :name,
      :description,
      :due_date
    )
  end
end