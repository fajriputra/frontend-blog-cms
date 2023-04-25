import { useEffect } from 'react';

export const useScrollToFirstFormError = ({ isSubmitting, errors }) => {
	useEffect(() => {
		if (isSubmitting) return;
		if (Object.keys(errors)?.length > 0) {
			if (document.querySelector(`input[name=${Object.keys(errors)[0]}`) === null)
				document
					.querySelector(`input[name=${Object.keys(errors)[0]}`)
					?.scrollIntoView({ block: 'center', behavior: 'smooth' });
		}
	}, [isSubmitting]);
};
