export class DatasourceQuery {
	constructor(param) {
		this.currentPage = param.currentPage;
		this.filter = param.filter;
		this.perPage = param.perPage;
		this.total = param.total;
		this.search = param.search;
	}
	currentPage = 1;
	filter = {
		key: '',
		value: '',
	};
	perPage = 10;
	total = 0;
	search = '';
}

export class DatasourceResponse {
	data = null;
	message = '';
	meta = DatasourceQuery;
}
