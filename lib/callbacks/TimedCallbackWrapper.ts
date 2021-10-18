import type { Callback } from './Callback';
import type { ICallbackWrapper } from './ICallbackWrapper';

/** @deprecated */
export class TimedCallbackWrapper implements ICallbackWrapper {
	wrap<I, K>(
		hook: string,
		chainedCallback: (item: I, constant?: K) => I,
	): (item: I, constant?: K) => I {
		return (item: I, constant?: K): I => {
			const time = Date.now();
			const ret = chainedCallback(item, constant);
			const totalTime = Date.now() - time;
			console.log(`${hook}:`, totalTime);
			return ret;
		};
	}

	wrapOne<I, K>(_hook: string, callback: Callback<I, K>): (item: I, constant?: K) => I {
		return (item: I, constant?: K): I => {
			const time = Date.now();

			const result = callback(item, constant);

			const currentTime = Date.now() - time;
			const stack = callback.stack?.split?.('\n')?.[2]?.match(/\(.+\)/)?.[0];
			console.log(String(currentTime), callback.hook, callback.id, stack);
			return result;
		};
	}
}
