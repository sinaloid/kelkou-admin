export const Input = ({
  type,
  label,
  name,
  placeholder,
  formik,
  options = [],
}) => {
  if (type === "text") {
    return (
      <div className="mb-3">
        {label && (
          <label htmlFor={name} className="form-label">
            {label}
          </label>
        )}
        <input
          className="form-control"
          type="text"
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={formik.handleChange}
          value={formik.values[name]}
        />
      </div>
    );
  }

  if (type === "password") {
    return (
      <div className="mb-3">
        {label && (
          <label htmlFor={name} className="form-label">
            {label}
          </label>
        )}
        <input
          className="form-control"
          type="password"
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={formik.handleChange}
          value={formik.values[name]}
        />
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="mb-3">
        {label && (
          <label htmlFor={name} className="form-label">
            {label}
          </label>
        )}
        <textarea
          className="form-control"
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={formik.handleChange}
          value={formik.values[name]}
          rows={3}
        ></textarea>
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className="mb-3">
        {label && (
          <label htmlFor={name} className="form-label">
            {label}
          </label>
        )}
        <select
          className="form-select"
          id={name}
          name={name}
          onChange={formik.handleChange}
          value={formik.values[name]}
        >
          <option value={""}>{placeholder}</option>
          {options.map((data, idx) => {
            return (
              <option value={data.id} key={data.id + idx}>
                {data.label}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
  if (type === "file") {
    return (
      <div className="mb-3">
        {label && (
          <label htmlFor={name} className="form-label">
            {label}
          </label>
        )}
        <input
          className="form-control"
          type="file"
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={(e) => {
            formik.setFieldValue(name, e.target.files[0]);
          }}
        />
      </div>
    );
  }
  if (type === "date") {
    return (
      <div className="mb-3">
        {label && (
          <label htmlFor={name} className="form-label">
            {label}
          </label>
        )}
        <input
          className="form-control form-control-sm1 form-floating-height1"
          type="date"
          id={name}
          name={name}
          onChange={formik.handleChange}
          value={formik.values[name]}
        />
      </div>
    );
  }
};
