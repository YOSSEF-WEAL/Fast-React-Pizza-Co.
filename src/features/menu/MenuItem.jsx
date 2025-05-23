import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityByID } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { name, unitPrice, ingredients, soldOut, imageUrl, id } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityByID(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  }
  return (
    <li className="flex gap-4 p-2 ">
      <img
        loading="lazy"
        src={imageUrl}
        alt={name}
        className={`h-24 rounded-lg ${soldOut ? "opacity-70 grayscale " : ""}`}
      />
      <div className="flex flex-col grow pt-0.5">
        <p className="font-medium ">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex  items-center justify-between">
          {!soldOut ? (
            <p className="text-sm text-green-400 font-semibold">
              {formatCurrency(unitPrice)}
            </p>
          ) : (
            <p className="text-sm uppercase font-medium text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex items-center  gap-3">
              {" "}
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add TO Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
