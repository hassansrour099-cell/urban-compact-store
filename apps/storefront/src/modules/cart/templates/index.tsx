import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div
      className="uc-cart-page uc-listing-page py-12 small:py-16"
      data-uc-room="collection"
    >
      <div className="content-container" data-testid="cart-container">
        <div className="uc-page-head uc-listing-head mb-8">
          <p className="uc-eyebrow">Bag</p>
          <h1>Your selection</h1>
          <p>Review pieces before checkout — quiet, clear, no clutter.</p>
        </div>
        {cart?.items?.length ? (
          <div className="uc-cart-layout">
            <div className="uc-cart-items">
              {!customer && (
                <>
                  <SignInPrompt />
                  <Divider />
                </>
              )}
              <ItemsTemplate cart={cart} />
            </div>
            <div className="uc-cart-summary">
              {cart && cart.region && <Summary cart={cart} />}
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
