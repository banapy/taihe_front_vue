export interface Defer<T = any> {
	promise: Promise<T>;
	resolve: (value?: T | PromiseLike<T>) => void;
	reject: (reason?: any) => void;
}
/**
 * 实例化一个对象形式的promise，方便传递resolve和reject
 */
export function getDefer<T>(): Defer<T> {
	let _resolve: any;
	let _reject: any;
	let promise = new Promise<T>((resolve, reject) => {
		_resolve = resolve;
		_reject = reject;
	});
	return {
		promise,
		resolve: _resolve,
		reject: _reject,
	};
}