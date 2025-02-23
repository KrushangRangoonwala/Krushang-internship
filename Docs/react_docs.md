### Array `useSatate([])`
```v
 const [items, setItems] = useState([]);
  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };
```

### Set Up a Global Axios Instance (Optional)

Create a `axiosInstance.js` file to configure a `base URL` and `headers`.

```v
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

// Then, use it in other files when we call axios:
import axiosInstance from "./axiosInstance";

const fetchData = async () => {
  const response = await axiosInstance.get("/posts");
  console.log(response.data);
};
```

### Example of how to use radio buttons with useFormik in React:

```v
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const MyForm = () => {
  const formik = useFormik({
    initialValues: {gender: "" },
    validationSchema: Yup.object({
      gender: Yup.string().required("Please select a gender"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted with:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>
        <input
          type="radio"
          name="gender"
          value="male"
          onChange={formik.handleChange}
          checked={formik.values.gender === "male"}
        />
        Male
      </label>

      <label>
        <input
          type="radio"
          name="gender"
          value="female"
          onChange={formik.handleChange}
          checked={formik.values.gender === "female"}
        />
        Female
      </label>

      <label>
        <input
          type="radio"
          name="gender"
          value="other"
          onChange={formik.handleChange}
          checked={formik.values.gender === "other"}
        />
        Other
      </label>

      {/* Show validation error */}
      {formik.touched.gender && formik.errors.gender ? (
        <div style={{ color: "red" }}>{formik.errors.gender}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
```

###

```v
// what i use : run correctly
let formData = new FormData();
formData.append("emailId", values.email);
formData.append("password", values.psw);
let res = await axios.post("/login", formData, {
  headers: { "Content-Type": "application/json" },
});
```

**chatgpt says :**

1.  If we use JSON data instead of _formData_ then it need to specify `{ headers: { "Content-Type": "application/json" },}`

```v
// not run yet
 let res = await axios.post('/forgotPassword', { emailId: values.email }, {
      headers: { "Content-Type": "application/json" }
    });
```

2. if we use _formData_ then , _Axios_ will automatically set `"Content-Type": "multipart/form-data"`. Which is okay

```v
// not run yet
let res = await axios.post('/forgotPassword', formData);
```

> In JSX (React), you can use the onBlur event as an equivalent to onfocusout in JavaScript.
