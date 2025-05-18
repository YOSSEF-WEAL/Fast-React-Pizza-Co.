import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3 space-y-1">
      <div className="flex items-center justify-between flex-wrap gap-4 text-sm">
        <p className="flex items-center gap-3">
          <span className=" text-yellow-600 font-bold w-8 h-8 flex items-center justify-center rounded-full  bg-yellow-200">
            {quantity}&times;
          </span>{" "}
          {name}
        </p>
        <p className=" text-green-600 font-bold py-2 px-4 flex items-center justify-center rounded-full  bg-green-200">
          {formatCurrency(totalPrice)}
        </p>
      </div>
      <p className="text-sm capitalize italic text-stone-500">
        {isLoadingIngredients ? "loading..." : ingredients.join(", ")}
      </p>
    </li>
  );
  // text-green-400 font-semibold
}
export default OrderItem;
