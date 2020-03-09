import React, { useState } from 'react';
import { string, object, array } from 'yup';

const defaults = {
	email: '',
	password: '',
	colour: '',
	animal: [],
	tiger_type: '',
};

/**
 * Validation with the 'yup' library - complex validation logic is hard to get
 * right and maintain, so using a battle-tested library is a good call.
 * Having a validation schema defined in one place also makes it easier to
 * document and adjust over time
 */
export const validationSchema = object({
	email: string()
		.required('required')
		.email('must be a valid email address'),
	password: string().min(8, 'must be 8 characters or more'),
	colour: string().required('required'),
	animal: array().min(2, 'must select at least two'),
	tiger_type: string().when('animal', {
		is: animal => animal.includes('tiger'),
		then: string().required('required when choosing "Tiger"'),
	}),
});

/**
 * Submit handler - pure client-side in this iteration, but sending the values
 * using `fetch` is straightforward
 */
const handleSubmit = (values, setErrors) => e => {
	e.preventDefault();
	validationSchema
		.validate(values, { abortEarly: false })
		.then(() => {
			alert(
				"Let's submit that form! Backend left as an exercise to the reader"
			);
		})
		.catch(err => {
			console.error(err);
			setErrors(
				err.inner.reduce((acc, innerErr) => {
					acc[innerErr.path] = innerErr.message;
					return acc;
				}, {})
			);
		});
};

/**
 * This form maintains the state of all form elements, including their
 * current values and error states. It uses _controlled inputs_ to ensure
 * that UI state always matches app state.
 *
 * This pattern is loosely inspired by Formik, which is a very well-designed
 * form building library for React - not used here because it would be difficult
 * to review by someone who has not used it before.
 *
 *
 *
 * type values = { [name]: string };
 * type errors = { [name]: string };
 */
const Form = props => {
	const [values, setValues] = useState(props.values || defaults);
	const [errors, setErrors] = useState(props.errors || {});

	const handleAnimalChange = animalName => e => {
		const animal = values.animal.filter(a => a != animalName);
		if (values.animal.includes(animalName)) {
			setValues({ ...values, animal });
		} else {
			setValues({
				...values,
				animal: values.animal.concat(animalName),
			});
		}
	};

	return (
		<form onSubmit={props.handleSubmit || handleSubmit(values, setErrors)}>
			<h1>Fill out this awesome form</h1>
			{Object.keys(errors).length > 0 && (
				<span className="error">There is a problem with this form!</span>
			)}
			<fieldset>
				<h3>Your details</h3>
				<p className={errors.email && 'error'}>
					<label className="label" htmlFor="email">
						Email {errors.email}
					</label>
					<input
						type="text"
						id="email"
						name="email"
						value={values.email}
						onChange={e => setValues({ ...values, email: e.target.value })}
					/>
				</p>
				<p className={errors.password && 'error'}>
					<label className="label" htmlFor="password">
						Password {errors.password}
					</label>
					<input
						className="error"
						type="password"
						id="password"
						value={values.password}
						onChange={e => setValues({ ...values, password: e.target.value })}
					/>
				</p>
			</fieldset>
			<fieldset>
				<h3>Your animal</h3>
				<p className={errors.colour && 'error'}>
					<label className="label" htmlFor="colour">
						Colour {errors.colour}
					</label>
					<select
						name="colour"
						id="colour"
						value={values.colour}
						onChange={e => setValues({ ...values, colour: e.target.value })}
					>
						<option value="">Choose colour</option>
						<option value="blue">Blue</option>
						<option value="green">Green</option>
						<option value="red">Red</option>
						<option value="black">Black</option>
						<option value="brown">Brown</option>
					</select>
				</p>
				<p className={errors.animal && 'error'}>
					<span className="label">Animal {errors.animal}</span>
					<input
						type="checkbox"
						name="animal"
						value="bear"
						id="bear"
						checked={values.animal.includes('bear')}
						onChange={handleAnimalChange('bear')}
					/>
					<label htmlFor="bear">Bear</label>
					<input
						type="checkbox"
						name="animal"
						value="tiger"
						id="tiger"
						checked={values.animal.includes('tiger')}
						onChange={handleAnimalChange('tiger')}
					/>
					<label htmlFor="tiger">Tiger</label>
					<input
						type="checkbox"
						name="animal"
						value="snake"
						id="snake"
						checked={values.animal.includes('snake')}
						onChange={handleAnimalChange('snake')}
					/>
					<label htmlFor="snake">Snake</label>
					<input
						type="checkbox"
						name="animal"
						value="donkey"
						id="donkey"
						checked={values.animal.includes('donkey')}
						onChange={handleAnimalChange('donkey')}
					/>
					<label htmlFor="donkey">Donkey</label>
				</p>
				{values.animal.includes('tiger') && (
					<p className={errors.tiger_type && 'error'}>
						<label className="label" htmlFor="tiger_type">
							Type of tiger {errors.tiger_type}
						</label>
						<input name="tiger_type" id="tiger_type" />
					</p>
				)}
			</fieldset>
			<fieldset>
				<p>
					<input type="submit" value="Create account" />
				</p>
			</fieldset>
		</form>
	);
};
export default Form;
