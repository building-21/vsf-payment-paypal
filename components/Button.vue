<template>
  <div>
    <div style="color: red;">
      {{ $t(message) }}
    </div>
    <div v-if="disabled">
      <div class="paypal-button disabled-overlay" />
    </div>
    <div v-else>
      <div class="paypal-button" />
    </div>
  </div>
</template>

<style>
.disabled-overlay {
    position: relative;
    margin-bottom: -8px;
    content: '';
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: .3;
    z-index: 1000;
}
</style>
<script>
import { PaypalButton } from './PaypalButton'

export default {
  mixins: [PaypalButton],
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
