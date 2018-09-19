const { doFetch } = require('./helpers')

async function getOrder (orderId) {
  try {
    const response = await doFetch(`/${orderId}`, {
      method: 'GET'
    })

    const order = await response.json()

    // Try to JSON.parse the basketMetadata if it exists
    order.merchant_order_data = JSON.parse(order.merchant_order_data || null)

    if (order.merchant_order_data) {
      if (
        Object.hasOwnProperty.call(order.merchant_order_data, 'basketMetadata')
      ) {
        order.merchant_order_data = order.merchant_order_data.basketMetadata
      }
    }

    return { success: true, order }
  } catch (error) {
    return { success: false, error }
  }
}

module.exports = getOrder
