import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import CartContents from "../Cart/CartContents";
import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const drawerRef = useRef();
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerOpen && drawerRef.current && !drawerRef.current.contains(event.target)) {
        toggleCartDrawer();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerOpen, toggleCartDrawer]);

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };
  return (
    <div
      ref={drawerRef}
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform 
        transition-transform duration-300 flex flex-col z-10 ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* close button */}
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      {/* Cart content with scrollable area */}
      <div className="flex-grow p-4 overflow-y-auto">
        <Link to="/cart" className=" text-blue-500 hover:text-blue-800">
          Your Cart
        </Link>

        {/* Component for Cart Contents */}
        {cart && cart?.products?.length > 0 ? (
          <CartContents cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* Checkout button fixed at the bottom */}
      <div className="p-4 bg-white sticky bottom-0">
        {cart && cart?.products?.length > 0 ? (
          <>
            <button
              onClick={handleCheckout}
              className="w-full bg-white text-primary hover:text-white py-3 rounded-lg font-semibold hover:bg-primary transition border-primary border-2"
            >
              Checkout
            </button>
            <p className="text-sm tracking-tighter text-gray-500  mt-2 text-center">
              Shipping, taxes, and discount codes calculated at checkout
            </p>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
