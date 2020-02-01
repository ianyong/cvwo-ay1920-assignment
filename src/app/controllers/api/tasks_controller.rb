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

  def update
    @task = Task.find(params[:id])
    puts params[:tag_list]
    @task.tag_list = params[:tag_list]
    @task.update(task_params)
    if @task.save
      render json: @task, status: 200
    else
      render json: { error: 'Unable to update task' }, status: 400
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