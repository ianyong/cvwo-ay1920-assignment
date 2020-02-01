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
    if params.has_key?(:tag_list)
      @task.tag_list = params[:tag_list]
    end
    @task.update(task_params)
    if @task.save
      render json: @task, status: 200
    else
      render json: { error: 'Unable to update task' }, status: 400
    end
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    if @task.errors.any?
      render json: { error: 'Unable to delete task' }, status: 400
    else
      render json: { message: 'Task successfully deleted' }, status: 200
    end
  end

  private

  def task_params
    params.permit(
      :name,
      :description,
      :due_date,
      :is_completed
    )
  end
end