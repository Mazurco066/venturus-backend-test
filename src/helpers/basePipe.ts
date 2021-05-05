// Types
import { IPipeResponse } from './pipeResponse'

// Helper
export default (...fns: any) => async (initialParameter: any): Promise<IPipeResponse> => {
	const normalizeParameter = (parameter: any): IPipeResponse => {
		let p = parameter || {}
		if (p.status === undefined) {
			p = { ...p, status: { code: 200, message: '' } }
		}
		if (p.status.code === undefined) {
			p = { ...p, status: { code: 200, ...p.status } }
		}
		if (p.status.message === undefined) {
			p = { ...p, status: { message: '', ...p.status } }
		}
		return p
	}
  return await fns.reduce(async (ac: any, f: any): Promise<IPipeResponse> => {
		const p = normalizeParameter(await ac)
		if (![200, 201, 202, 203, 204].includes(p.status.code)) return p
		return f(p)
	}, initialParameter)
}