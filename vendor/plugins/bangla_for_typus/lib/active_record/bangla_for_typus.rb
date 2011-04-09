module ActiveRecord
  module BanglaForTypus

    def self.included(base)
      base.extend(ClassMethods)
    end

    module ClassMethods

      def bangla_for_typus(*attr_names)
        attr_names.each { |attr_name| localize_attr_accessor(attr_name) }
      end

      def localize_attr_accessor(name)
        define_method(:"#{name}_bn=") do |value|
          unless value.nil?
            bn = self.translations.find_or_create_by_locale(:bn)
            bn.name = value
            bn.save
          end
        end
        define_method(:"#{name}_bn") do |*args|
          self.translations.find_by_locale(:bn).name rescue  read_attribute(name) rescue ''
        end
      end

      module InstanceMethods

      end
    end
  end
end
