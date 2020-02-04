class AddTagsFilterToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :tags_filter, :string
  end
end
