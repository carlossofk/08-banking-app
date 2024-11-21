import { useForm } from 'react-hook-form';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputText } from '@ui/components/FieldText';

describe('<InputText />', () => {

  // ==> Mocks functions and custom hooks
  const Wrapper = ({ defaultValues }: { defaultValues: Record<string, unknown> }) => {
    const { control } = useForm({ defaultValues });
    return (
      <InputText
        name="testField"
        control={control}
        label="Test Label"
        placeholder="Enter text"
        type="text"
        error="This is an error"
      />
    );
  };

  const setup = (defaultValues = {
    testField: '',
  }) =>
    render(<Wrapper defaultValues={defaultValues} />);


  test('Renders the component with all props', () => {
    setup();
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });


  test('Updates the input value when typing', () => {
    setup();
    const input = screen.getByTestId('testField') as HTMLInputElement;
    fireEvent.change(input, {
      target: { value: 'New Value' } 
    });

    expect(input.value).toBe('New Value');
  });


  test('Displays the error message if the error prop is passed', () => {
    setup();
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });


  test('Renders the label when provided', () => {
    setup();
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });


  test('Is controlled by react-hook-form', () => {
    const defaultValues = { testField: 'Default Value' };
    const Wrapper = () => {
      const { control } = useForm({ defaultValues });
      return (
        <InputText
          name="testField"
          control={control}
          label="Controlled Field"
          placeholder="Controlled placeholder"
        />
      );
    };

    render(<Wrapper />);

    const input = screen.getByTestId('testField') as HTMLInputElement;
    expect(input.value).toBe('Default Value');
    
    fireEvent.change(input, {
      target: { value: 'Updated Value' } 
    });
    expect(input.value).toBe('Updated Value');
  });
});
