import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../assets/featured.jpg";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slices/cartSlice";
import Input from "../components/Inputs/Input";
import { validateEmail } from "../utils/helper";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  // Get redirect parameter and check if it's checkout or something
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter full name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm">
          <div className=" flex justify-center mb-6">
            <h2 className="text-xl font-medium">EiTi</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋</h2>
          <p className="text-center mb-6">Enter your details to create an account.</p>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="email.@example.com"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <Input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Min 8 Characters"
              type="password"
            />
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button
            type="submit"
            className="w-full bg-white text-primary hover:text-white p-2 rounded-lg font-semibold hover:bg-primary transition border-primary border-2"
          >
            {loading ? "loading..." : "Sign Up"}
          </button>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500">
              Login
            </Link>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center bg-[#f1ede4]">
          <img src={login} alt="Login to Account" className="h-[750px] w-full object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Register;
