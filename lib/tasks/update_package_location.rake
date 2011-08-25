desc "update location of package"
task :update_location => :environment do
  Package.find_each do |package|
    package.save #location will be automatically  updated
    puts "updated #{package.id} "
  end
end