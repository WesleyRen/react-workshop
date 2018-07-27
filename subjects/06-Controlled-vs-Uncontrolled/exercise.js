////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - Save the state of the form and restore it when the page first loads, in
//   case the user accidentally closes the tab before the form is submitted
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import serialize from "form-serialize";

class CheckoutForm extends React.Component {

    state = {
        shippingName: "",
        shippingState: "",
        isShippingSameAsBillingChecked: true
    };

    handleUpdate(event) {
      var form = document.querySelector('#inputForm');

      var values = serialize(form, { hash: true });
        console.log(values);
      if (values.isSameAsBillingCheckbox && "on" === values.isSameAsBillingCheckbox) {
        this.setState({isShippingSameAsBillingChecked: true})
        if (values.billingName) {
            this.setState({shippingName: values.billingName});
        }
        if (values.billingState) {
            this.setState({shippingState: values.billingState});
        }
      } else {
          this.setState({
              shippingName: values.shippingName,
              shippingState: values.shippingState,
              isShippingSameAsBillingChecked: false});
      }
    }

    submit(event) {
      event.preventDefault();
      var form = document.querySelector('#inputForm');
      console.log(serialize(form, { hash: true }));
    }

    render() {

      return (
        <div>
          <h1>Checkout</h1>
          <form id="inputForm" onChange={(event) => this.handleUpdate(event)}
                               onSubmit={(event) => this.submit(event)}>
            <fieldset>
              <legend>Billing Address</legend>
              <p>
                <label>
                  Billing Name: <input name="billingName" type="text" />
                </label>
              </p>
              <p>
                <label>
                  Billing State: <input name="billingState" type="text" size="2" />
                </label>
              </p>
            </fieldset>

            <br />

            <fieldset>
              <label>
                <input name="isSameAsBillingCheckbox" type="checkbox"
                       defaultChecked={this.state.isShippingSameAsBillingChecked} /> Same as billing
              </label>
              <legend>Shipping Address</legend>
              <p>
                <label>
                  Shipping Name: <input name="shippingName" value={this.state.shippingName} type="text"
                                        readOnly={this.state.isShippingSameAsBillingChecked}/>
                </label>
              </p>
              <p>
                <label>
                  Shipping State: <input name="shippingState" value={this.state.shippingState} type="text" size="2"
                                         readOnly={this.state.isShippingSameAsBillingChecked}/>
                </label>
              </p>
            </fieldset>

            <p>
              <button>Submit</button>
            </p>
          </form>
        </div>
      );
  }
}

ReactDOM.render(<CheckoutForm />, document.getElementById("app"));
