module ActiveRecord
  module BanglaForTypus

    def self.included(base)
      base.extend(ClassMethods)
    end

    module ClassMethods

      def bangla_for_typus(*attr_names)
        include InstanceMethods
        after_save :save_bangla!
        attr_reader :bn_stash
        attr_names.each { |attr_name| localize_attr_accessor(attr_name) }
      end

      def localize_attr_accessor(name)
        define_method(:"#{name}_bn=") do |value|
          @bn_stash ||= {}
          @bn_stash[name.to_s] = value
        end

        define_method(:"#{name}_bn") do |*args|
          self.translations.find_by_locale(:bn).name rescue read_attribute(name) rescue ''
        end
      end

      module InstanceMethods
        def save_bangla!
          bn_stash.each do |name, value|

            translation = self.translations.find_or_initialize_by_locale('bn')
            translation[name] = value
O
            translation.save!
          end
          bn_stash.clear
        end
      end
    end
  end
end
