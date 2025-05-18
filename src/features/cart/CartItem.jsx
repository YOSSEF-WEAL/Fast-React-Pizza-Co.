import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./updateItemQuantity";
import { getCurrentQuantityByID } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityByID(pizzaId));

  return (
    <li
      id={pizzaId}
      className="py-3 sm:flex sm:items-center sm:justify-between"
    >
      <p className="mb-1 sm:mb-0">
        <span className="p-2 bg-yellow-200 rounded-lg text-yellow-700 border border-yellow-700 text-sm">
          {quantity}&times;
        </span>{" "}
        {name}
      </p>
      <div className="flex justify-between sm:gap-6 items-center">
        <p className="text-sm font-bold text-green-400">
          {formatCurrency(totalPrice)}
        </p>
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />

        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
