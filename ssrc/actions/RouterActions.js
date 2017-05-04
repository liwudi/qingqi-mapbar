/**
 * Created by ligj on 2016/9/27.
 */
export const JUMP_TO = 'JUMP_TO';

export function jumpTo(route) {
	return {
		type: JUMP_TO,
		route
	}
}