import React from 'react';
import { validationSchema } from './Form.jsx';

const VALID = {
	email: 'foo@example.com',
	password: '12345678',
	colour: 'perriwinkle blue',
	animal: ['liger', 'wholphin', 'tiger'],
	tiger_type: 'sneaky',
};

describe('validationSchema', () => {
	test('passes validation for valid values', () =>
		expect(validationSchema.validate(VALID)).resolves.toBe(VALID));

	test('rejects invalid email', () =>
		expect(
			validationSchema.validate({
				...VALID,
				email: 'ihavenodomain',
			})
		).rejects.toThrow());
	test('rejects missing tiger_type when tiger selected', () =>
		expect(
			validationSchema.validate({
				...VALID,
				tiger_type: '',
			})
		).rejects.toThrow());
});
