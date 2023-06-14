import React, { useState, useEffect } from "react";
import { Paper, Grid, Typography, TextField, Alert, Box } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../../Components/FormElements/Button";
import { generateId } from "../../Utilis/Utilis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addTopic, resetTopic } from "../../Redux/Slice/TopicSlice";
import PageLoading from "../../Components/PageLoading/PageLoading";
import { TIMEOUT_TIME } from "../../Utilis/Utilis";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CreatableSelect from "react-select/creatable";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

const tagOptions = [
  { label: "online presence", value: "online presence" },
  { label: "small businesses", value: "small businesses" },
  { label: "digitel marketing", value: "digitel marketing" },
  { label: "branding", value: "branding" },
];

const TopicForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(null);

  const { message } = useSelector((state) => {
    return {
      message: state?.topics?.message,
    };
  });

  const formInitialValues = {
    name: "",
    keywords: [],
    category: "Custom",
    details: "",
  };

  const handeSave = ({ name, keywords, category, details }) => {
    setIsLoading(true);
    let id = params?.id;
    if (!id) id = generateId();
    const payload = {
      id,
      name,
      keywords,
      category,
      details,
    };
    dispatch(addTopic(payload));
  };

  useEffect(() => {
    if (message) {
      setShowMessage(message);
      dispatch(resetTopic());
      setTimeout(() => {
        navigate(-1);
      }, TIMEOUT_TIME);
    }
  }, [message]);

  const handleBack = () => {
    navigate("/topics");
  };

  return (
    <Box className="page-wrapper">
      {showMessage && (
        <Alert severity="success" variant="filled">
          {showMessage}
        </Alert>
      )}
      <Button
        variant="outlined"
        type="button"
        className="btn-primary back-btn"
        label="Back to Home"
        icon={<KeyboardBackspaceIcon />}
        onClick={() => navigate("/")}
      />
      <PageLoading loading={isLoading} />
      <Grid container sx={{ marginBottom: 3 }}>
        <Grid item xs={12} textAlign="left">
          <Typography variant="h5">
            <strong>Topics</strong>
          </Typography>
          <Typography className="sub-heading-text">
            Create/Update Topic
          </Typography>
        </Grid>
      </Grid>
      <Paper className="form-wrapper-ui">
        <Formik
          enableReinitialize
          initialValues={formInitialValues}
          validationSchema={validationSchema}
          onSubmit={handeSave}
        >
          {({
            errors,
            touched,
            values,
            handleChange,
            handleBlur,
            setFieldValue,
          }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={6} sx={{ marginBottom: 1 }} textAlign="left">
                  <TextField
                    error={errors.name && touched.name}
                    id="name"
                    label="Name"
                    fullWidth
                    value={values?.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.name && touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={6} sx={{ marginBottom: 1 }} textAlign="left">
                  <CreatableSelect
                    isMulti
                    placeholder="Enter keywords..."
                    className="select-multi"
                    name="keywords"
                    options={tagOptions}
                    value={values.keywords.map((keyword) => ({
                      label: keyword,
                      value: keyword,
                    }))}
                    onChange={(selectedOptions) =>
                      setFieldValue(
                        "keywords",
                        selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : []
                      )
                    }
                  />
                </Grid>
                <Box className="form-actions">
                  <Button
                    variant="outlined"
                    type="button"
                    className="btn-primary-outlined"
                    label="Cancel"
                    loading={isLoading}
                    onClick={handleBack}
                  />
                  <Button
                    variant="contained"
                    className="btn-primary"
                    type="submit"
                    label="Save"
                    loading={isLoading}
                  />
                </Box>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};
export default TopicForm;
