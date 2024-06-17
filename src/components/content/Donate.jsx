import React from "react";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51P7ihOSAxDrEWrCaBH1n0ZbclzfPSY8nhDNOekEQycsiaCUHFIVMDlbajrHdkg9UqbbJXmjWmf9MvzD7aLNE15Sy00RtapekOA"
);
const DonationButton = ({ itemID, ammount }) => {
  const handleClick = async (event) => {
    const stripe = await stripePromise;
    stripe
      .redirectToCheckout({
        lineItems: [{ price: itemID, quantity: 1 }],
        mode: "payment",
        successUrl: window.location.protocol + "//localhost:3000/home/merge",
        cancelUrl: window.location.protocol + "//localhost:3000/merge",
        submitType: "donate",
      })
      .then(function (result) {
        if (result.error) {
          console.log(result);
        }
      });
  };
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
      onClick={handleClick}
    >
      Donate {ammount}$
    </button>
  );
};
export default function App() {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <DonationButton
          ammount={"5.00"}
          itemID="price_1IUx1FJ2iOysJZvP1LD3EzTR"
        ></DonationButton>
      </div>
    </>
  );
}