class CreateAdDisciplines < ActiveRecord::Migration
  def self.up
    create_table :ad_disciplines do |t|
      t.integer :ad_id
      t.integer :discipline_id
      t.string :value

      t.timestamps
    end

    add_index(:ad_disciplines, [:ad_id, :discipline_id])
  end

  def self.down
    drop_table :ad_disciplines
  end
end
