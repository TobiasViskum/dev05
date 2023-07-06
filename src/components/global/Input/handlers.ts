function handleChange(
  e: React.ChangeEvent<HTMLInputElement>,
  placeholder: string | undefined
) {
  if (e.target.value === "" && placeholder) {
    e.target.placeholder = placeholder;
  }
}

function handleFocus(
  e: React.FocusEvent<HTMLInputElement>,
  disableSelection: boolean | undefined
) {
  e.target.placeholder = "";
  if (disableSelection) return;
  e.target.select();
}

function handleBlur(
  e: React.FocusEvent<HTMLInputElement>,
  placeholder: string | undefined
) {
  if (e.target.value === "" && placeholder) {
    e.target.placeholder = placeholder;
  }
}

export const handlers = {
  handleChange: handleChange,
  handleFocus: handleFocus,
  handleBlur: handleBlur,
};
