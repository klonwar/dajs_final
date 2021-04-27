import React, {FC, useEffect, useState} from "react";
import {Field, FieldRenderProps, Form} from "react-final-form";
import {useDispatch} from "react-redux";
import {Operations} from "#src/js/redux/operations/operations";
import {required} from "#src/js/util/validators";
import {OnChange} from "react-final-form-listeners";
import debounce from "#src/js/util/debounce";

interface FormData {
  search: string;
}

const createInput = (data: FieldRenderProps<string>): JSX.Element => {
  const {
    autofocus = false,
    disabled = false,
    input,
    placeholder = ``,
    className = ``,
    errorClassName = ``
  } = data;

  const instError = data.meta.error && data.meta.touched && data.meta.active;
  const submError = (data.meta.submitError || data.meta.submitFailed) && !data.meta.active;

  const errorText = data.meta.error || ``;
  const error = (instError || submError) && errorText;

  return (
    <>
    <input {...input} autoFocus={autofocus} disabled={disabled} placeholder={(error) ? errorText : placeholder}
           className={`${className} ${(error) ? errorClassName : ``}`} />
    </>
  );
};

const SearchForm: FC = () => {
  const dispatch = useDispatch();
  const [randomPlaceholder, setRandomPlaceholder] = useState<string>(undefined);

  useEffect(() => {
    const placeholders = [
      `Harry Potter`,
      `Eragon`,
      `Archmage`,
      `The Call of Cthulhu`,
      `Rowling`,
      `Eliezer Yudkowsky`,
      `Andrzej Sapkowski`,
      `You don't know js`
    ];
    setRandomPlaceholder(`E.g. ` + placeholders[Math.floor(Math.random() * placeholders.length)]);
  }, []);

  return (
    <Form<FormData>
      onSubmit={(formData: FormData) => {
        dispatch(Operations.sendRequest({search: formData.search || ``}));
      }}
      render={({handleSubmit}) => (
        <form className={`SearchForm`} onSubmit={handleSubmit}>
          <Field
            className={`SearchForm-input`}
            errorClassName={`SearchForm-input--error`}
            type={`text`}
            name={`search`}
            initialValue={``}
            placeholder={randomPlaceholder}
            validate={required}
          >
            {createInput}
          </Field>
          <OnChange name={`search`}>
            {() => {
              debounce(handleSubmit, 500);
            }}
          </OnChange>
          <button className={`SearchForm-button`} type={`submit`}>GO</button>
        </form>
      )}
    />
  );
};

export default SearchForm;
