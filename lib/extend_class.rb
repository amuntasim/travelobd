# coding: utf-8

class String
  def zerofy
    self.to_i < 10 ? "0#{self}" : self
  end

  def localize
    if I18n.locale.to_s == 'bn'
      number_str = self.to_s
      return_str = ''
      if self.encoding.name == 'UTF-8'
        number_str = number_str.force_encoding('ASCII-8BIT')
        replace_bangla_number(number_str).collect do |s|
           return_str += s.force_encoding('UTF-8')
        end
        return  return_str
      else
        return replace_bangla_number(number_str).join('')
      end
    else
      return self
    end
  end

  private
  def replace_bangla_number(str)

    op_str = []
    str.each_byte do |number|
      op_str << if  BANGLA_NUMBER_MAP[number.chr]
                  BANGLA_NUMBER_MAP[number.chr]
                else
                  number.chr
                end
    end
    op_str
  end

  BANGLA_NUMBER_MAP = {
      '0' => '০',
      '1' => '১',
      '2' => '২',
      '3' => '৩',
      '4' => '৪',
      '5' => '৫',
      '6' => '৬',
      '7' => '৭',
      '8' => '৮',
      '9' => '৯',
  }
end

class Float
  def localize
    if I18n.locale.to_s == 'bn'
      return self.to_s.localize
    else
      return self
    end
  end
end
class Fixnum
  def zerofy
    self < 10 ? "0#{self}" : self
  end

  def localize
    if I18n.locale.to_s == 'bn'
      return self.to_s.localize
    else
      return self
    end
  end

end

class Array
  def add_condition! (condition, conjunction = 'AND')
    if String === condition
      add_condition!([condition])
    elsif Hash === condition
      add_condition!([condition.keys.map { |attr| "#{attr}=?" }.join(' AND ')] + condition.values)
    elsif Array === condition
      self[0] = "(#{self[0]}) #{conjunction} (#{condition.shift})" unless empty?
      (self << condition).flatten!

    else
      raise "don't know how to handle this condition type"
    end
    self
  end
end