import { FormikConfig, FormikHelpers, useFormik } from 'formik';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useRetryableObservable } from 'react-use-observable';
import { Observable, of } from 'rxjs';
import { share } from 'rxjs/operators';

export declare type FormikConfigResolver<Values> = {
  [K in Exclude<keyof FormikConfig<Values>, 'onSubmit'>]?: FormikConfig<Values>[K];
};

interface IParams<Values, Result$> extends FormikConfigResolver<Values> {
  initialValues: Values;
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => Observable<Result$>;
}

export function useFormikObservable<Values, Result$>({ onSubmit, ...params }: IParams<Values, Result$>) {
  const promiseRef = useRef<{ promise?: Promise<any> }>({}).current;
  const [submitData, setSubmitData] = useState<{ model: Partial<Values>; formikHelpers: FormikHelpers<Values> }>();

  const [result, error, completed, retry] = useRetryableObservable<Result$>(() => {
    if (!submitData) return of(undefined);

    const observable$ = onSubmit(submitData.model as Values, submitData.formikHelpers).pipe(share());
    promiseRef.promise = observable$.toPromise().catch(() => {});

    return observable$;
  }, [submitData]);

  const formik = useFormik<Partial<Values>>({
    ...params,
    onSubmit: (model, formikHelpers) => {
      setSubmitData({ model, formikHelpers });
      return new Promise(resolve => setTimeout(() => resolve(promiseRef.promise), 500));
    }
  });

  const handleCheckboxArrayChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = new Set(formik.values[e.target.name]);

      if (e.target.checked) {
        value.add(e.target.value);
      } else {
        value.delete(e.target.value);
      }

      // for some reason, formik doesn't make the field touched
      formik.setFieldTouched(e.target.name, true, false);
      formik.setFieldValue(e.target.name, Array.from(value), true);
    },
    [formik]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<any>) => {
      // for some reason, formik doesn't make the field touched
      formik.setFieldTouched(e.target.name, true, false);
      formik.handleChange(e);
    },
    [formik]
  );

  return {
    ...formik,
    handleCheckboxArrayChange,
    handleChange,
    observable: {
      result,
      error,
      completed,
      retry
    }
  };
}
