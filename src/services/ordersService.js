import http from '@/services/http'
import API_CONFIG from '@/config/api'

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export const OrdersService = {
	async create(order) {
		// order: { status, order_date, products: [{ product_id, quantity }] }
		if (API_CONFIG.useMocks) {
			await delay(API_CONFIG.mockLatency)
			return { success: true, order_id: Date.now() }
		}
		const { data } = await http.post(API_CONFIG.orders.create, order)
		return data
	},

	async myOrders(params = {}) {
		if (API_CONFIG.useMocks) {
			await delay(API_CONFIG.mockLatency)
			return { orders: [] }
		}
		const { data } = await http.get(API_CONFIG.orders.myOrders, { params })
		return data
	},

	async getById(orderId) {
		if (!orderId) throw new Error('order id required')
		if (API_CONFIG.useMocks) {
			await delay(API_CONFIG.mockLatency)
			return { order: null }
		}
		const { data } = await http.get(API_CONFIG.orders.byId(orderId))
		return data
	}
}

export default OrdersService
