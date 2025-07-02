import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartContents from "../components/Cart/CartContents";

const CartPage = () => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;
  console.log(cart);
  const handleCheckout = () => {
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      {/* Header */}

      {cart && cart?.products?.length > 0 ? (
        <div>
          <h1 className="text-3xl font-semibold text-center mb-6">Your Cart</h1>
          <CartContents cart={cart} userId={userId} guestId={guestId} />
          {/* Subtotal */}
          <div className="mt-6 text-right space-y-1">
            <div className="text-sm">
              Total: <span className=" text-black font-medium">${cart.totalPricetoFixed(2)}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handleCheckout}
              className="w-full bg-white text-primary hover:text-white py-3 rounded-lg font-semibold 
        hover:bg-primary transition border-primary border-2"
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-3xl font-semibold text-center mb-6">Your cart is empty.</h1>
      )}
    </div>
  );
};

export default CartPage;
