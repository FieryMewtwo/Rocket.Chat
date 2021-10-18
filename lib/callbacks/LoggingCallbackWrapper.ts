import type { Logger } from '../../app/logger/server';
import type { Callback } from './Callback';
import type { ICallbackWrapper } from './ICallbackWrapper';

/** @deprecated */
export class LoggingCallbackWrapper implements ICallbackWrapper {
	constructor(public logger: Logger) {}

	wrap<I, K>(
		_hook: string,
		chainedCallback: (item: I, constant?: K) => I,
	): (item: I, constant?: K) => I {
		return chainedCallback;
	}

	wrapOne<I, K>(hook: string, callback: Callback<I, K>): (item: I, constant?: K) => I {
		return (item: I, constant?: K): I => {
			this.logger?.debug(`Executing callback with id ${callback.id} for hook ${hook}`);
			return callback(item, constant);
		};
	}
}
