export function submitOrder(order) {
  console.log('GC Cheese order:', order)
  return Promise.resolve({ ok: true })
}
