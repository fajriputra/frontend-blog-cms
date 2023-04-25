import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';

import { formats, modules } from './constants/tools';

import 'react-quill/dist/quill.snow.css';
import './BaseTextEditor.scss';

const BaseTextEditor = (props) => {
	const [state, setState] = useState('');

	const internalHandleChange = (e) => {
		setState(e);
		props.onChange && props.onChange(e);
	};

	useEffect(() => {
		setState(props.value || '');
	}, [props.value]);

	return (
		<div className={`shared-component BaseTextEditor ${props.className || ''}`} style={props.style}>
			<ReactQuill
				value={state}
				onChange={(e) => internalHandleChange(e)}
				theme='snow'
				formats={formats}
				modules={modules}
				placeholder='Write text here...'
			/>
		</div>
	);
};

export default BaseTextEditor;
