class AlterDivisionDistrict < ActiveRecord::Migration
  def self.up
    add_column :districts, :division_id, :integer

    Division.all.each do |division|
      district = District.find(division.district_id) rescue nil
      if district
        district.update_attribute(:division_id, division.id)
      end
    end
    remove_column(:divisions, :district_id)
  end

  def self.down
    add_column :divisions, :district_id, :integer
    remove_column :districts, :division_id
  end
end
