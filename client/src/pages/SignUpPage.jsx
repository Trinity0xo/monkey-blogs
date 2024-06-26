import { useForm } from "react-hook-form";
import { Button } from "../components/button";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { config, icons } from "../utils/constants";
import InputAuth from "../components/input/InputAuth";
import { Label } from "../components/label";
import { Field } from "../components/field";
import { apiRegister } from "../api/apisHung";
import { toast } from "react-toastify";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (values) => {
    if (!isValid) return;
    const { email, password } = values;

    const response = await apiRegister(email, password);
    if (response) {
      toast.success(response.message, {
        pauseOnHover: false,
        delay: 150,
      });
    }
  };

  return (
    <div>
      <form
        className="w-full max-w-lg mx-auto"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="email">Email address</Label>
          <InputAuth
            type="email"
            name="email"
            placeholder="Enter your email"
            control={control}
          />
          <p className="text-red-500">{errors?.email?.message}</p>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputAuth
            type="password"
            name="password"
            placeholder="Enter your password"
            control={control}
          />
          <p className="text-red-500">{errors?.password?.message}</p>
        </Field>
        <div className="have-account">
          You already have an account ? <NavLink to={"/sign-in"}>Login</NavLink>{" "}
        </div>
        <div className="flex items-center justify-center gap-3 mt-5">
          <Button
            type="submit"
            className="w-full max-w-[300px] mx-auto"
            width="150px"
            height="45px"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
          <p className="text-lg font-semibold text-gray-400">or</p>
          <Button
            type="button"
            height="45px"
            to={`${config.SERVER_HOST}/auth/google`}
          >
            {icons.googleIcon} <span className="ml-2">Sign up with Google</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
