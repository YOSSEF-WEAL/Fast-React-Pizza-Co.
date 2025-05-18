import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLodingAddress = addressStatus === "loading";
  const formErrors = useActionData();
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>
      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            placeholder="First Name"
            className="input"
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex  gap-2 flex-col sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Phone number</label>

          <input
            type="tel"
            name="phone"
            required
            placeholder="Phone"
            className="input"
          />
        </div>

        {formErrors?.phone && (
          <div className="mb-5 flex items-center ">
            {" "}
            <p className="text-xs mt-2 text-red-700 bg-red-200 p-2 rounded-md mx-auto mb-5 w-full text-center">
              {formErrors.phone}
            </p>{" "}
          </div>
        )}

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>

          <input
            type="text"
            name="address"
            required
            placeholder="Address"
            className="input"
            disabled={isLodingAddress}
            defaultValue={address}
          />
          {!position.latitude && !position.longitude && (
            <span className="md:absolute right-[5px] top-1 z-10 sm:static">
              <Button
                disabled={isLodingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                type="small"
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        {addressStatus === "error" && (
          <div className="mb-5 flex items-center ">
            {" "}
            <p className="text-xs mt-2 text-red-700 bg-red-200 p-2 rounded-md mx-auto mb-5 w-full text-center">
              {errorAddress}
            </p>{" "}
          </div>
        )}

        <div className="mb-12 flex gap-3 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 rounded-full"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />

          <Button disabled={isSubmitting || isLodingAddress} type="primary">
            {isSubmitting
              ? "Plising Order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please Give Us Your Correct Phone Number, We Might need it to Contact You";
  if (Object.keys(errors).length > 0) return errors;

  // is everything is okay, create new order and redirect
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
