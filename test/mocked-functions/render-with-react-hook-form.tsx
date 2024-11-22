import { ReactElement } from 'react';
import { render, RenderResult } from '@testing-library/react';
import { DefaultValues, useForm, UseFormReturn, FormProvider, FieldValues } from 'react-hook-form';

interface RenderWithReactHookFormOptions<TFieldValues extends FieldValues> {
  defaultValues?: Partial<TFieldValues>; 
  toPassBack: (keyof UseFormReturn<TFieldValues>)[]; 
}

interface RenderWithReactHookFormResult<TFieldValues extends FieldValues>
  extends RenderResult {
  reactHookFormMethods: Partial<UseFormReturn<TFieldValues>>; 
}

export function renderWithReactHookForm<TFieldValues extends FieldValues>(
  ui: ReactElement,
  options: RenderWithReactHookFormOptions<TFieldValues> = {
    toPassBack: []
  }
): RenderWithReactHookFormResult<TFieldValues> {

  const { defaultValues = {}, toPassBack = [] } = options;
  const reactHookFormMethods: Partial<UseFormReturn<TFieldValues>> = {};

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm<TFieldValues>({ 
      defaultValues: defaultValues as DefaultValues<TFieldValues>
    });

    toPassBack.forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (reactHookFormMethods as any)[key] = (methods as any)[key];
    });

    return (
      <FormProvider {...methods}>
        {children}
      </FormProvider>
    );
  };

  return {
    ...render(ui, { wrapper: Wrapper }),
    reactHookFormMethods,
  } as RenderWithReactHookFormResult<TFieldValues>;
  
}