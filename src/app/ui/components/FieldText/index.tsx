import { Control, FieldValues, Path, useController } from 'react-hook-form';
import './styles.scss';

interface FieldTextProps <T extends FieldValues> {
  name:         Path<T>;
  control:      Control<T>;
  error?:       string;
  label?:       string;
  type?:        string;
  placeholder?: string; 
}

export const InputText = <T extends FieldValues>({
  name,
  control,
  error,
  label,
  type,
  placeholder,
}: FieldTextProps<T>) => {

  const { field } = useController({ name, control });

  return (
    <div className='input-text'>
      {label && (<label className='input-text__label' htmlFor={field.name}>{label}</label>)}
      <input
        id={field.name}
        data-testid={field.name}
        className='input-text__input'
        {...field}
        type={type} 
        placeholder={placeholder}
      />
      {error && (
        <span 
          className='input-text__error'>
          {error}
        </span>
      )}
    </div>
  );
};
