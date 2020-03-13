import slugify from 'slugify';

export function arraySlugifier(arr) {
	var computedArray = [];
	for (const row of arr) {
		computedArray.push(
			slugify(row, {
				replacement: '_', // Remplace espace par "_"
				remove: /[!°]/gm, // On enlève les "!" et "°"
				lower: true, // Et on met en lowercase
			})
		);
	}
	return computedArray;
}

export function arrayToJSON(arr) {
	var headers = arraySlugToHeader(arraySlugifier(arr.shift()));
	var result = [];
	for (const line of arr) {
		var obj = {};
		for (const header of headers) {
			obj[header] = line.shift()
		}
		result.push(obj);
	}
	return result;
}

export function arraySlugToHeader(arr) {
	var computedArray = [];
	for (const row of arr) {
		let formatedRow = row;
		formatedRow = formatedRow.replace(/l\'/g, '');
		formatedRow = formatedRow.replace(/d\'/g, '');
		formatedRow = formatedRow.replace(/_de_/g, '_');
		formatedRow = formatedRow.replace(/_du_/g, '_');
		formatedRow = formatedRow.replace(/_le_/g, '_');
		formatedRow = formatedRow.replace(/_la_/g, '_');
		formatedRow = formatedRow.replace(/_a_/g, '_');
		formatedRow = formatedRow.replace(/_:_/g, '_');
		formatedRow = formatedRow.replace(/_dans_/g, '_');
		formatedRow = formatedRow.replace(/_\([a-z_]*\)/g, '');
		formatedRow = formatedRow.replace(/\+/g, '_plus_');
		formatedRow = formatedRow.replace(/\(calc.\)/g, 'calcule');
		formatedRow = formatedRow.replace(/:/g, '');
		formatedRow = formatedRow.replace(/\./g, '');
		computedArray.push(formatedRow);
	}
	return computedArray;
}

export function arrayHeaderToSequelizeJsonModel(arr) {
	return JSON.parse(`
{
	"${arr.join('": {"type": null},\n\t"')}": {"type": null}
}
`);
}