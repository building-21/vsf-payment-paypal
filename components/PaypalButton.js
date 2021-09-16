import { mapGetters } from 'vuex';

export const PaypalButton = {
  name: 'PaypalButton',
  props: {
    styling: {
      type: Object,
      required: false,
      default: () => ({
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'paypal'
      })
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      token: 'payment-paypal-magento2/getToken',
      message: 'payment-paypal-magento2/getMessage'
    })
  },
  methods: {

    //
    // We use the SDK to render the PayPal Button.
    //
    renderButton () {
      if (this.disabled) {
        window.paypal.Buttons({
          createOrder: null,
          onApprove: null,
          style: this.styling
        }).render('.paypal-button')
      } else {
        window.paypal.Buttons({
          createOrder: this.onCreateOrder,
          onApprove: this.onApprove,
          style: this.styling
        }).render('.paypal-button')
      }
    },

    //
    // This is implementation from the PayPal SDK
    //
    async onCreateOrder (data, actions) {
      // Use our server side integration to setup the Payment
      let result = await this.$store.dispatch('payment-paypal-magento2/createOrder')
      return result;
    },

    //
    // This is implementation from the PayPal SDK
    //
    async onApprove (data, actions) {
      let additionalMethod = {
        button: 1,
        paypal_express_checkout_token: data.orderID,
        paypal_express_checkout_payer_id: data.payerID,
        paypal_express_checkout_redirect_required: false
      }
      this.$bus.$emit('checkout-do-placeOrder', additionalMethod)
    }
  },
  mounted () {
    this.renderButton()
  }
}
