import http from '@/services/http'
import API_CONFIG from '@/config/api'

export const UploadService = {
	async image(file) {
		const fd = new FormData()
		fd.append('image', file)
		const { data } = await http.post(API_CONFIG.fandoms.uploadImage, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
		return data // { url }
	}
}

export default UploadService
